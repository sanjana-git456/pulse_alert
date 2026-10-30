# LocalPulse Alerts

A real-time safety and local experience alert system built with React and Django.

## Features
- **Safety Alerts**: Real-time reports on protests, weather, and crowds.
- **Local Tips**: Micro-reviews of hidden gems and pop-up events.
- **Verification**: Trusted local badge for verified contributors.
- **Dashboard**: Summary of nearby activity and safety stats.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, TanStack Query
- **Backend**: Django, Django REST Framework, SimpleJWT
- **Database**: PostgreSQL (Supabase)

## Setup
1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```
2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Set `VITE_API_URL=http://localhost:8000/api` in your frontend environment.