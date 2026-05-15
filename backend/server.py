from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

import resend
from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'contact@goglobalnow.com.au')

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ============== MODELS ==============
class InquiryCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    country: Optional[str] = "Brazil"
    program_interest: str
    preferred_destination: Optional[str] = None
    english_level: Optional[str] = None
    intake_date: Optional[str] = None
    message: Optional[str] = None


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: str
    phone: str
    country: str
    program_interest: str
    preferred_destination: Optional[str] = None
    english_level: Optional[str] = None
    intake_date: Optional[str] = None
    message: Optional[str] = None
    status: str = "new"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ConsultationCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    preferred_date: str
    preferred_time: str
    topic: Optional[str] = None
    notes: Optional[str] = None


class Consultation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: str
    phone: str
    preferred_date: str
    preferred_time: str
    topic: Optional[str] = None
    notes: Optional[str] = None
    status: str = "pending"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ChatMessageIn(BaseModel):
    session_id: str
    message: str


class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


# ============== HELPERS ==============
async def send_email_async(to: str, subject: str, html: str):
    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not configured — skipping email send")
        return None
    try:
        params = {"from": SENDER_EMAIL, "to": [to], "subject": subject, "html": html}
        result = await asyncio.to_thread(resend.Emails.send, params)
        return result
    except Exception as e:
        logger.error(f"Resend email failed: {e}")
        return None


def inquiry_admin_email_html(inq: dict) -> str:
    return f"""
    <table style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; background:#F9F8F6; padding:24px; border:1px solid #E7E5E4;">
      <tr><td style="background:#003B5C; color:#fff; padding:20px; text-align:center;">
        <h1 style="margin:0; font-size:22px;">New Student Inquiry</h1>
      </td></tr>
      <tr><td style="padding:24px; background:#fff;">
        <p style="margin:0 0 12px;"><strong>Name:</strong> {inq.get('full_name')}</p>
        <p style="margin:0 0 12px;"><strong>Email:</strong> {inq.get('email')}</p>
        <p style="margin:0 0 12px;"><strong>Phone:</strong> {inq.get('phone')}</p>
        <p style="margin:0 0 12px;"><strong>Country:</strong> {inq.get('country')}</p>
        <p style="margin:0 0 12px;"><strong>Program:</strong> {inq.get('program_interest')}</p>
        <p style="margin:0 0 12px;"><strong>Destination:</strong> {inq.get('preferred_destination') or '-'}</p>
        <p style="margin:0 0 12px;"><strong>English Level:</strong> {inq.get('english_level') or '-'}</p>
        <p style="margin:0 0 12px;"><strong>Intake:</strong> {inq.get('intake_date') or '-'}</p>
        <p style="margin:0 0 12px;"><strong>Message:</strong><br/>{inq.get('message') or '-'}</p>
      </td></tr>
    </table>
    """


def inquiry_student_email_html(inq: dict) -> str:
    return f"""
    <table style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; background:#F9F8F6; padding:24px;">
      <tr><td style="background:#003B5C; color:#fff; padding:24px; text-align:center;">
        <h1 style="margin:0; font-size:24px; font-weight:400; letter-spacing:0.5px;">Go Global Now</h1>
        <p style="margin:8px 0 0; color:#F59E0B;">Your Journey Begins Here</p>
      </td></tr>
      <tr><td style="padding:32px 24px; background:#fff; color:#1C1917;">
        <h2 style="margin:0 0 16px; color:#003B5C;">Hi {inq.get('full_name')},</h2>
        <p style="line-height:1.6;">Thank you for reaching out to Go Global Now. We've received your inquiry about <strong>{inq.get('program_interest')}</strong> in Australia.</p>
        <p style="line-height:1.6;">One of our QEAC certified education agents will contact you within 24 hours to discuss your goals and the best pathway for you.</p>
        <p style="margin:24px 0; padding:16px; background:#F9F8F6; border-left:4px solid #F59E0B;">In the meantime, you can WhatsApp us at <strong>+61 401 864 097</strong> for instant support.</p>
        <p style="color:#57534E; font-size:14px;">— Go Global Now Team<br/>Sydney, Australia</p>
      </td></tr>
    </table>
    """


# ============== ROUTES ==============
@api_router.get("/")
async def root():
    return {"message": "Go Global Now API", "status": "ok"}


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate):
    inq = Inquiry(**payload.model_dump())
    doc = inq.model_dump()
    await db.inquiries.insert_one(dict(doc))
    # Send emails async (don't block on failure)
    asyncio.create_task(send_email_async(ADMIN_EMAIL, f"New Inquiry: {inq.full_name}", inquiry_admin_email_html(doc)))
    asyncio.create_task(send_email_async(inq.email, "We received your inquiry — Go Global Now", inquiry_student_email_html(doc)))
    return inq


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries():
    items = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api_router.patch("/inquiries/{inquiry_id}")
async def update_inquiry_status(inquiry_id: str, status: str):
    result = await db.inquiries.update_one({"id": inquiry_id}, {"$set": {"status": status}})
    if result.matched_count == 0:
        raise HTTPException(404, "Inquiry not found")
    return {"updated": True}


@api_router.post("/consultations", response_model=Consultation)
async def create_consultation(payload: ConsultationCreate):
    c = Consultation(**payload.model_dump())
    doc = c.model_dump()
    await db.consultations.insert_one(dict(doc))
    asyncio.create_task(send_email_async(
        ADMIN_EMAIL,
        f"New Consultation Booking: {c.full_name}",
        f"<p><strong>{c.full_name}</strong> booked a consultation on <strong>{c.preferred_date} at {c.preferred_time}</strong>.</p><p>Email: {c.email}<br/>Phone: {c.phone}<br/>Topic: {c.topic or '-'}<br/>Notes: {c.notes or '-'}</p>"
    ))
    asyncio.create_task(send_email_async(
        c.email,
        "Your consultation is booked — Go Global Now",
        f"<p>Hi {c.full_name},</p><p>Your free consultation is scheduled for <strong>{c.preferred_date} at {c.preferred_time}</strong>. We'll send you a confirmation with details shortly.</p><p>— Go Global Now</p>"
    ))
    return c


@api_router.get("/consultations", response_model=List[Consultation])
async def list_consultations():
    items = await db.consultations.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api_router.get("/stats")
async def get_stats():
    inq_count = await db.inquiries.count_documents({})
    cons_count = await db.consultations.count_documents({})
    return {
        "students_helped": 1200 + inq_count,
        "partner_institutions": 85,
        "years_experience": 7,
        "success_rate": 98,
        "total_inquiries": inq_count,
        "total_consultations": cons_count,
    }


# ============== CHATBOT ==============
SYSTEM_PROMPT = """You are Aussie, the friendly AI assistant for Go Global Now — an Australian education agency helping Brazilian and Latino students study in Australia.

You help with:
- English courses (ELICOS): General English, IELTS/Cambridge prep, Business English, Academic English
- Vocational Education (VET): Business, IT, Nursing, Engineering, Design (Certificate I-IV, Diploma, Advanced Diploma)
- High School Programs (ages 12-18, public & private)
- Higher Education: Bachelors, Masters, PhDs, Graduate Diplomas
- Student visa (Subclass 500) basics
- Top destinations: Sydney, Melbourne, Brisbane, Gold Coast, Perth
- Cost of living, study + work rights (48 hrs/fortnight)

Tone: warm, encouraging, concise (2-4 short paragraphs max). End every response by inviting the student to book a free consultation or WhatsApp +61 401 864 097 for personalised advice. If a question is outside Australia study, gently redirect.

Always recommend they speak with a QEAC certified agent for personalised visa/course advice."""


@api_router.post("/chat")
async def chat(payload: ChatMessageIn):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(500, "LLM key not configured")
    try:
        # Save user message
        user_msg = {"session_id": payload.session_id, "role": "user", "content": payload.message,
                    "timestamp": datetime.now(timezone.utc).isoformat()}
        await db.chat_messages.insert_one(dict(user_msg))

        chat_inst = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=payload.session_id,
            system_message=SYSTEM_PROMPT,
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")

        response = await chat_inst.send_message(UserMessage(text=payload.message))

        assistant_msg = {"session_id": payload.session_id, "role": "assistant", "content": response,
                         "timestamp": datetime.now(timezone.utc).isoformat()}
        await db.chat_messages.insert_one(dict(assistant_msg))

        return {"response": response, "session_id": payload.session_id}
    except Exception as e:
        logger.exception("Chat error")
        raise HTTPException(500, f"Chat error: {str(e)}")


@api_router.get("/chat/history/{session_id}")
async def chat_history(session_id: str):
    msgs = await db.chat_messages.find({"session_id": session_id}, {"_id": 0}).sort("timestamp", 1).to_list(500)
    return {"session_id": session_id, "messages": msgs}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
