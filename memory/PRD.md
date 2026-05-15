# Go Global Now — PRD

## Original Problem Statement
"Hello I would like to get a better outcome of my sales and ai believe the website has a lot of room for imorovment, can you please review and get me a better option website that I can attract more students visual https://goglobalnow.com.au"

## App Overview
A premium, conversion-optimised education-agency website for **Go Global Now** — a Brazil-to-Australia student education agency — replacing the existing plain WordPress site.

## User Personas
- **Prospective student (16-30, Brazilian/Latino)** — researching study options in Australia
- **Parent/family** — evaluating trust and credibility before contacting
- **Admin/agent (Go Global Now staff)** — manages inbound inquiries and consultations

## Architecture
- **Frontend**: React 19 + Tailwind + shadcn UI; fonts Cormorant Garamond (display) + Outfit (body)
- **Backend**: FastAPI + Motor (MongoDB), Resend for email, Claude Sonnet 4.5 (via emergentintegrations) for chatbot
- **Routes**: `/` Home, `/programs`, `/destinations`, `/about`, `/contact`, `/admin`

## Core Requirements (Static)
- High-conversion hero + multiple CTAs (Book Consultation, WhatsApp, Call)
- Showcase 4 programs (ELICOS, VET, High School, Higher Education)
- Showcase top 5 destinations (Sydney, Melbourne, Brisbane, Gold Coast, Perth)
- Trust signals (QEAC certified, stats counters, testimonials)
- Multi-step student inquiry form
- Free consultation booking with date+time picker
- AI chatbot (Aussie) powered by Claude
- Floating WhatsApp button
- Admin dashboard listing inquiries/consultations + stats
- Email notifications to admin + auto-reply to student (Resend)

## Implemented (2025-12)
- Backend APIs: `/api/inquiries`, `/api/consultations`, `/api/chat`, `/api/chat/history/{sid}`, `/api/stats`
- Resend email integration (graceful no-op when key empty)
- Claude chatbot with multi-turn (session_id + persisted in MongoDB)
- Marketing pages: Home (hero + programs + Why Us + destinations + testimonials + FAQ + CTA), Programs, Destinations, About
- Contact: multi-step inquiry form (3 steps) + consultation booking with shadcn Calendar
- Admin dashboard at /admin
- Floating WhatsApp + AI chat widget
- data-testid coverage across interactive elements
- Multilingual-ready content (currently English; PT/ES can be added)

## Backlog (P0 / P1 / P2)
- **P0**: Provide Resend API key for live email delivery; ensure DKIM/SPF on custom domain
- **P0**: Add real testimonials/photos from actual past students
- **P1**: Admin authentication (currently public /admin)
- **P1**: Replace placeholder partner-institution logos with real ones
- **P1**: PT/ES language toggle (i18n)
- **P2**: Blog / Resources hub for SEO
- **P2**: Student portal with login (track application status)
- **P2**: Integrate Stripe for paid services (visa application, premium consultation)
- **P2**: Live chat handoff from Aussie AI to human agent

## Next Tasks
- Hook real Resend domain + send transactional template
- Protect /admin with auth
- Add SEO meta tags, OG images, sitemap
- Add Google Analytics + Meta Pixel for conversion tracking
