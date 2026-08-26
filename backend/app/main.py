import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.db.session import engine, Base
from app.api import auth, jobs, saved_jobs, applications, profile, notifications, dashboard, admin

logger = logging.getLogger(__name__)
settings = get_settings()

# Create tables gracefully (handles missing DB in dev without crashing)
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    logger.warning(f"Could not create database tables: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="CareerFlow API - Job Discovery & Application Tracking Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS + ["https://careerflow-platform.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router, prefix=settings.API_V1_PREFIX)
app.include_router(jobs.router, prefix=settings.API_V1_PREFIX)
app.include_router(saved_jobs.router, prefix=settings.API_V1_PREFIX)
app.include_router(applications.router, prefix=settings.API_V1_PREFIX)
app.include_router(profile.router, prefix=settings.API_V1_PREFIX)
app.include_router(notifications.router, prefix=settings.API_V1_PREFIX)
app.include_router(dashboard.router, prefix=settings.API_V1_PREFIX)
app.include_router(admin.router, prefix=settings.API_V1_PREFIX)


@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "CareerFlow API"}
