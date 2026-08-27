# CareerFlow

**Discover opportunities. Track applications. Build your career.**

CareerFlow is a full-stack job discovery and application tracking platform that helps job seekers organize their job search, track applications through every stage, and gain actionable insights through analytics.

### 🔗 Live Demo

**Frontend:** https://careerflow-platform.vercel.app/

**GitHub Repository:** https://github.com/prathyusha031/careerflow-platform

**Backend API:** https://careerflow-platform.onrender.com/

**API Documentation:** https://careerflow-platform.onrender.com/docs

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Problem Statement](#problem-statement)
- [Business Value](#business-value)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Deployment](#deployment)
- [Security](#security)
- [AI Usage](#ai-usage)
- [Challenges & Solutions](#challenges--solutions)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

CareerFlow is a modern SaaS-style web application built to solve a real problem in the job search process. It provides a centralized workspace where users can:

- **Discover** jobs through search and advanced filtering
- **Apply** and track every application through visual stages
- **Analyze** their job search with meaningful analytics
- **Organize** with saved jobs, reminders, and notifications

## Problem Statement

Job seekers often discover opportunities across multiple platforms — LinkedIn, Indeed, company career pages, referrals — but have no centralized way to track where they've applied, what stage each application is in, and when to follow up. This leads to:

- Missed follow-up deadlines
- Duplicate applications
- Lost track of promising opportunities
- Inability to measure job search effectiveness

CareerFlow solves this by providing a single, intelligent workspace for the entire job search lifecycle.

## Business Value

- **Time savings**: Automate tracking that would otherwise require spreadsheets or scattered notes
- **Better outcomes**: Analytics reveal patterns that help users optimize their approach
- **Organization**: Never lose track of an application or miss a follow-up
- **Professional development**: Profile management helps users present their best selves

---

## Features

### For Job Seekers
- 🔍 **Smart Job Discovery** — Search and filter by title, location, salary, skills, experience level, and remote type
- 📋 **Application Tracker** — Visual Kanban board to manage applications through stages
- 📊 **Analytics Dashboard** — Insights on response rates, conversion funnels, and trends
- 🔖 **Saved Jobs** — Bookmark interesting positions for later review
- 🔔 **Smart Notifications** — Interview reminders, status updates, and follow-up alerts
- 👤 **Profile Management** — Skills, experience, education, and job preferences
- 📱 **Responsive Design** — Works seamlessly on desktop, tablet, and mobile

### For Admins
- ➕ **Job Management** — Create, edit, and delete job listings
- 👥 **User Management** — View all registered users
- 📊 **Application Overview** — Monitor all applications across the platform

---

## Architecture

```
┌──────────────────────┐
│      React/Vite      │
│     TypeScript       │
│     Tailwind CSS     │
└──────────┬───────────┘
           │ REST API
           ▼
┌──────────────────────┐
│       FastAPI        │
│       Python         │
│   JWT Authentication │
└──────────┬───────────┘
           │ SQLAlchemy
           ▼
┌──────────────────────┐
│     PostgreSQL       │
│      Database        │
└──────────────────────┘

Frontend → Vercel
Backend  → Render
Database → PostgreSQL
CI/CD    → GitHub Actions
```

The **React frontend** communicates with the **FastAPI backend** through REST APIs. The backend handles authentication, authorization, business logic, validation, and database operations. PostgreSQL provides persistent relational storage.

The production frontend is deployed on **Vercel**, while the FastAPI backend is deployed on **Render**. GitHub Actions provides automated CI checks for frontend and backend changes.

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI library |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| Tailwind CSS v4 | Utility-first styling |
| React Router | Client-side routing |
| TanStack Query | Data fetching/caching |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| Python 3.11 | Runtime |
| FastAPI | Web framework |
| SQLAlchemy | ORM |
| PostgreSQL | Database |
| Pydantic | Data validation |
| JWT (python-jose) | Authentication |
| Passlib/bcrypt | Password hashing |

### DevOps
| Technology | Purpose |
|------------|---------|
| GitHub Actions | CI/CD automation |
| Vercel | Frontend deployment |
| Render | Backend deployment |
| PostgreSQL | Production database |

---

## Project Structure

```
careerflow/
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── layout/    # Navbar, Layout
│   │   │   └── ui/        # Button, Card, Badge, Input, etc.
│   │   ├── pages/         # Route-level page components
│   │   ├── context/       # React context (auth)
│   │   ├── services/      # API client
│   │   ├── hooks/         # Custom React hooks
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main app with routing
│   │   └── main.tsx       # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── api/           # API route handlers
│   │   ├── core/          # Config, security utilities
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── db/            # Database session setup
│   │   └── main.py        # FastAPI application entry
│   ├── tests/             # Pytest test suite
│   ├── seed.py            # Database seed script
│   └── requirements.txt
│
├── .github/
│   └── workflows/         # CI/CD pipelines
│       ├── frontend-ci.yml
│       └── backend-ci.yml
│
├── .gitignore
├── .env.example
└── README.md
```

---

## Database Schema

### ER Diagram

```
┌──────────┐       ┌──────────┐       ┌───────────────┐
│   User   │──────<│ SavedJob │>──────│      Job      │
│          │       └──────────┘       │               │
│ id       │                          │ id            │
│ name     │       ┌───────────────┐  │ title         │
│ email    │──────<│  Application  │>──│ company       │
│ password │       │               │  │ location      │
│ role     │       │ id            │  │ description   │
│ created  │       │ user_id       │  │ salary_min    │
│ updated  │       │ job_id        │  │ salary_max    │
└────┬─────┘       │ status        │  │ job_type      │
     │             │ applied_at    │  │ experience    │
     │             │ notes         │  │ remote_type   │
     │             │ interview_date│  │ skills        │
     │             └───────────────┘  └───────────────┘
     │
     ├──<┌────────────────┐
     │   │  Notification  │
     │   │ id             │
     │   │ user_id        │
     │   │ title          │
     │   │ message        │
     │   │ is_read        │
     │   └────────────────┘
     │
     └──<┌────────────────┐
         │    Profile     │
         │ id             │
         │ user_id        │
         │ skills         │
         │ experience     │
         │ education      │
         └────────────────┘
```

### Tables

- **users** — User accounts with authentication
- **jobs** — Job listings with full details
- **saved_jobs** — Many-to-many: users ↔ saved jobs
- **applications** — User applications to jobs with status tracking
- **notifications** — User notifications with read state
- **profiles** — Extended user profile information

---

## API Documentation

The backend provides a RESTful API documented via OpenAPI/Swagger.

### Endpoints

#### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Sign in |
| GET | `/api/auth/me` | Get current user |

#### Jobs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/jobs` | No | List/search jobs |
| GET | `/api/jobs/:id` | No | Get job details |
| POST | `/api/jobs` | Admin | Create job |
| PUT | `/api/jobs/:id` | Admin | Update job |
| DELETE | `/api/jobs/:id` | Admin | Delete job |

#### Applications
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/applications` | Yes | List user applications |
| POST | `/api/applications` | Yes | Apply to a job |
| GET | `/api/applications/:id` | Yes | Get application details |
| PUT | `/api/applications/:id` | Yes | Update application |
| DELETE | `/api/applications/:id` | Yes | Delete application |

#### Saved Jobs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/saved-jobs` | Yes | List saved jobs |
| POST | `/api/saved-jobs/:job_id` | Yes | Save a job |
| DELETE | `/api/saved-jobs/:job_id` | Yes | Unsave a job |

#### Profile
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/profile` | Yes | Get profile |
| PUT | `/api/profile` | Yes | Update profile |

#### Notifications
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/notifications` | Yes | List notifications |
| PUT | `/api/notifications/:id/read` | Yes | Mark as read |
| PUT | `/api/notifications/read-all` | Yes | Mark all as read |

#### Dashboard
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/dashboard` | Yes | Get analytics data |

#### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/users` | Admin | List all users |
| GET | `/api/admin/applications` | Admin | List all applications |
| POST | `/api/admin/jobs` | Admin | Create job |
| PUT | `/api/admin/jobs/:id` | Admin | Update job |
| DELETE | `/api/admin/jobs/:id` | Admin | Delete job |

---

## Authentication

JWT-based authentication with:

- **Registration**: Creates user with hashed password (bcrypt)
- **Login**: Returns JWT token (24-hour expiry)
- **Protected Routes**: Validated via `Authorization: Bearer <token>` header
- **Role-based Access**: Admin routes require `role: admin` in token

---

## Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/careerflow
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRATION_MINUTES=1440
BACKEND_URL=http://localhost:8000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api
```

---

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL 15+
- Git

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create database
createdb careerflow

# Set environment variables
export DATABASE_URL=postgresql://user:password@localhost:5432/careerflow
export JWT_SECRET_KEY=your-secret-key

# Run migrations (creates tables)
python -c "from app.db.session import engine, Base; from app.models import *; Base.metadata.create_all(bind=engine)"

# Seed demo data
python seed.py

# Start server
uvicorn app.main:app --reload --port 8000
```

API docs available at: `http://localhost:8000/docs`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend available at: `http://localhost:5173`

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| User | demo@careerflow.dev | DemoPassword123! |
| Admin | admin@careerflow.dev | AdminPassword123! |

> ⚠️ These accounts are only seeded in development. Never use in production.

---

## Testing

### Backend Tests

```bash
cd backend
python -m pytest tests/ -v
```

Tests cover:
- User registration and login
- JWT authentication flow
- Job CRUD operations
- Application management
- Saved jobs functionality
- Admin authorization
- Dashboard analytics
- Input validation

### Frontend Build Verification

```bash
cd frontend
npm run build    # Production build
npm run lint     # Linting
npx tsc --noEmit # Type checking
```

---

### CI/CD Pipeline

The project uses GitHub Actions to automatically validate changes before deployment.

**Backend pipeline:**
- Installs Python dependencies
- Validates backend imports
- Runs automated tests
- Verifies backend code integrity

**Frontend pipeline:**
- Installs Node.js dependencies
- Runs ESLint
- Runs TypeScript type checking
- Creates a production build
- Verifies the build output

Both workflows run automatically on relevant pushes and pull requests to the `main` branch.

### Deployment Flow

```text
Developer
   │
   ▼
Git Push / Pull Request
   │
   ▼
GitHub Actions
   ├── Frontend CI
   └── Backend CI
   │
   ▼
Validation Passed
   │
   ├───────────────┐
   ▼               ▼
Vercel           Render
Frontend         Backend
   │               │
   └───────┬───────┘
           ▼
      Production App

---

## Deployment

CareerFlow is deployed as a full-stack production application.

### Production URLs

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://careerflow-platform.vercel.app/ |
| Backend API | Render | https://careerflow-platform.onrender.com/ |
| API Documentation | FastAPI / Swagger | https://careerflow-platform.onrender.com/docs |
| Source Code | GitHub | https://github.com/prathyusha031/careerflow-platform |

### Frontend Deployment

The React/Vite frontend is deployed on Vercel.

- **Platform:** Vercel
- **Root directory:** `frontend`
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Environment variable:** `VITE_API_URL`

### Backend Deployment

The FastAPI backend is deployed on Render.

- **Platform:** Render
- **Runtime:** Python
- **Build command:** `pip install -r requirements.txt`
- **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Database:** PostgreSQL
- **Environment variables:** Configured through the deployment platform

### Production Architecture

The deployed application follows this flow:

```text
User
 │
 ▼
Vercel
React Frontend
 │
 │ HTTPS REST API
 ▼
Render
FastAPI Backend
 │
 │ SQLAlchemy
 ▼
PostgreSQL

---

## Security

- ✅ Password hashing with bcrypt
- ✅ JWT authentication with expiration
- ✅ Role-based authorization (user/admin)
- ✅ Backend authorization on all protected routes
- ✅ Input validation via Pydantic schemas
- ✅ CORS configuration
- ✅ Environment variables for secrets
- ✅ No secrets committed to Git
- ✅ Proper error handling (no raw errors exposed)

---

## AI Usage

AI assistance was used throughout this project for:

- **Architecture brainstorming**: System design decisions, component architecture
- **Code generation**: Writing React components, FastAPI routes, database models, schemas
- **Debugging**: Identifying and fixing type errors, API issues, styling problems
- **Documentation**: README, API documentation, inline comments
- **CI/CD**: GitHub Actions workflow generation and configuration
- **Testing assistance**: Test suite design and implementation

All code was reviewed, tested, and verified to work correctly before delivery.

---

## Challenges & Solutions

1. **Kanban Board Responsiveness**: The horizontal scrolling Kanban board required careful CSS to work on both desktop (side-by-side columns) and mobile (scrollable). Solved with `overflow-x-auto` and minimum column widths.

2. **JWT Token Management**: Keeping authentication state synchronized between the API client, React context, and localStorage required careful coordination. Solved with a centralized `ApiClient` class that handles token storage.

3. **Database Seeding**: Creating realistic demo data that populates the database with meaningful content for showcasing all features. Solved with a comprehensive seed script covering users, profiles, jobs, applications, and notifications.

4. **Cross-Origin Authentication**: Frontend on Vercel and backend on a separate host requires proper CORS configuration and environment variable management. Solved with configurable origins and production URL settings.

---

## Future Improvements

- [ ] Email notifications for interview reminders
- [ ] File upload for resume/cover letter
- [ ] Job recommendations based on profile skills
- [ ] Integration with LinkedIn/Indeed job APIs
- [ ] Dark mode support
- [ ] Advanced analytics with date range filters
- [ ] Team/collaboration features for recruiters
- [ ] Public job posting links
- [ ] Export applications to CSV/PDF
- [ ] Rate limiting and API throttling

---

## Assessment Submission

This project was developed as a technical assessment demonstrating full-stack development, API design, database integration, authentication, CI/CD, and cloud deployment.

### Deliverables

- **Source Code:** https://github.com/prathyusha031/careerflow-platform
- **Live Application:** https://careerflow-platform.vercel.app/
- **Backend API:** https://careerflow-platform.onrender.com/
- **API Documentation:** https://careerflow-platform.onrender.com/docs
- **CI/CD:** GitHub Actions
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render
- **Database:** PostgreSQL

The application was tested locally and verified after production deployment.

## License

MIT License. See [LICENSE](LICENSE) for details.

---

*Built with ❤️ using React, FastAPI, and PostgreSQL.*
