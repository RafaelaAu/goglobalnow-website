"""Backend API tests for Go Global Now."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://conversion-next.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health
def test_root(client):
    r = client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"


def test_stats(client):
    r = client.get(f"{BASE_URL}/api/stats")
    assert r.status_code == 200
    d = r.json()
    for k in ["students_helped", "partner_institutions", "years_experience", "success_rate", "total_inquiries", "total_consultations"]:
        assert k in d


# Inquiry create + list
def test_create_and_list_inquiry(client):
    payload = {
        "full_name": "TEST_Maria Silva",
        "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+5511999999999",
        "country": "Brazil",
        "program_interest": "English (ELICOS)",
        "preferred_destination": "Sydney",
        "english_level": "Intermediate",
        "intake_date": "2026-03",
        "message": "Test message"
    }
    r = client.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code == 200, r.text
    inq = r.json()
    assert inq["full_name"] == payload["full_name"]
    assert inq["email"] == payload["email"]
    assert "id" in inq
    inq_id = inq["id"]

    # GET list and find created
    r2 = client.get(f"{BASE_URL}/api/inquiries")
    assert r2.status_code == 200
    items = r2.json()
    assert any(i["id"] == inq_id for i in items)


# Consultation create + list
def test_create_and_list_consultation(client):
    payload = {
        "full_name": "TEST_Joao Souza",
        "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
        "phone": "+5511988888888",
        "preferred_date": "2026-02-15",
        "preferred_time": "10:00",
        "topic": "Study options",
        "notes": "Test booking"
    }
    r = client.post(f"{BASE_URL}/api/consultations", json=payload)
    assert r.status_code == 200, r.text
    c = r.json()
    assert c["full_name"] == payload["full_name"]
    cid = c["id"]

    r2 = client.get(f"{BASE_URL}/api/consultations")
    assert r2.status_code == 200
    assert any(i["id"] == cid for i in r2.json())


# Chat - Claude integration
def test_chat_and_history(client):
    session_id = f"test_{uuid.uuid4().hex[:8]}"
    payload = {"session_id": session_id, "message": "Hi, can I study English in Sydney?"}
    r = client.post(f"{BASE_URL}/api/chat", json=payload, timeout=60)
    assert r.status_code == 200, r.text
    d = r.json()
    assert "response" in d
    assert isinstance(d["response"], str)
    assert len(d["response"]) > 0
    assert d["session_id"] == session_id

    # History
    r2 = client.get(f"{BASE_URL}/api/chat/history/{session_id}")
    assert r2.status_code == 200
    h = r2.json()
    assert h["session_id"] == session_id
    assert len(h["messages"]) >= 2
    roles = [m["role"] for m in h["messages"]]
    assert "user" in roles and "assistant" in roles


# Inquiry validation - email
def test_inquiry_bad_email(client):
    payload = {
        "full_name": "TEST_Bad",
        "email": "notanemail",
        "phone": "123",
        "program_interest": "VET"
    }
    r = client.post(f"{BASE_URL}/api/inquiries", json=payload)
    assert r.status_code == 422
