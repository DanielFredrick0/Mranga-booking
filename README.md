# Mranga Tours & Safaris LTD

Single-folder safari platform with a branded Next.js frontend and a Django REST backend for tours, destinations, reviews, quote requests, email verification, and admin management.

## Features

- Premium safari marketing website for Mranga Tours & Safaris LTD
- Safari listing and conversion-focused detail pages
- Destination landing pages
- Reviews, company, and contact pages
- Multi-step quote flow with email verification
- Floating WhatsApp CTA and chatbot-style assistant UI
- Protected admin dashboard plus Django admin
- PostgreSQL-ready backend models and demo seed data

## Stack

- Frontend: Next.js, TypeScript, Tailwind CSS, App Router
- Backend: Django, Django REST Framework
- Database: PostgreSQL
- Email: Resend API fallback to Django console email backend
- Schema mirror: Prisma schema included in `/prisma/schema.prisma`

## Folder structure

- `frontend/` Next.js application
- `backend/` Django API and admin
- `emails/` HTML email templates
- `prisma/` schema mirror for the PostgreSQL models
- `.env.example` shared environment template

## Setup

1. Copy `.env.example` to `.env` and update values.
2. Create PostgreSQL database named `mranga` or update `DATABASE_URL`.
3. Install backend dependencies:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

4. Install frontend dependencies:

```powershell
cd frontend
npm install
```

5. Optional root helper scripts:

```powershell
cd ..
npm install
```

## Database and seed

Run migrations and seed demo content:

```powershell
cd backend
.\venv\Scripts\python.exe manage.py makemigrations
.\venv\Scripts\python.exe manage.py migrate
.\venv\Scripts\python.exe manage.py seed_demo
```

Demo content includes:

- 6 safari packages
- 6 destinations
- 6 reviews
- Django superuser `mrangaadmin`

## Run locally

Start both apps separately:

```powershell
cd backend
.\venv\Scripts\python.exe manage.py runserver
```

```powershell
cd frontend
npm run dev
```

Or from the project root after installing root dependencies:

```powershell
npm run dev
```

Frontend URL: `http://localhost:3000`

Backend URL: `http://localhost:8000`

## Environment variables

- `DATABASE_URL` PostgreSQL connection string
- `DJANGO_SECRET_KEY` Django secret
- `NEXT_PUBLIC_API_BASE_URL` frontend API base URL
- `BACKEND_ADMIN_API_KEY` shared admin API key used by Next admin pages
- `ADMIN_LOGIN_EMAIL` and `ADMIN_LOGIN_PASSWORD` simple admin dashboard login
- `RESEND_API_KEY` optional Resend API key for real email sending
- `ADMIN_NOTIFICATION_EMAIL` admin alert recipient
- `WHATSAPP_NUMBER` default CTA number

## Deploy notes

- Deploy `frontend/` as a Next.js app on Vercel or another Node host.
- Deploy `backend/` as a Django app on Render, Railway, Fly.io, or a container platform.
- Point `NEXT_PUBLIC_API_BASE_URL` to the deployed Django API base URL.
- Use a managed PostgreSQL database in production.
- Set `DJANGO_DEBUG=False`, real `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and `CSRF_TRUSTED_ORIGINS`.
- Configure `RESEND_API_KEY` and a verified sending domain for production email.

## Admin access

- Frontend admin dashboard: `/admin/login`
- Django admin: `http://localhost:8000/admin/`
- Default seeded Django admin user: `mrangaadmin`
- Password comes from `DJANGO_SUPERUSER_PASSWORD`

