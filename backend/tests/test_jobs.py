import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.models.job import Job


class TestJobs:
    def _create_job(self, db):
        job = Job(
            title="Software Engineer",
            company="TestCorp",
            location="Hyderabad, India",
            description="A great job opportunity",
            requirements="3+ years experience",
            responsibilities="Build amazing things",
            salary_min=1000000,
            salary_max=2000000,
            job_type="full-time",
            experience_level="mid",
            remote_type="hybrid",
            skills='["Python", "FastAPI"]',
        )
        db.add(job)
        db.commit()
        db.refresh(job)
        return job

    def test_list_jobs_empty(self, client):
        response = client.get("/api/jobs")
        assert response.status_code == 200
        data = response.json()
        assert data["total"] == 0
        assert data["jobs"] == []

    def test_list_jobs_with_data(self, client, db):
        self._create_job(db)
        response = client.get("/api/jobs")
        assert response.status_code == 200
        data = response.json()
        assert data["total"] == 1
        assert data["jobs"][0]["title"] == "Software Engineer"

    def test_get_job(self, client, db):
        job = self._create_job(db)
        response = client.get(f"/api/jobs/{job.id}")
        assert response.status_code == 200
        assert response.json()["company"] == "TestCorp"

    def test_get_job_not_found(self, client):
        response = client.get("/api/jobs/nonexistent")
        assert response.status_code == 404

    def test_create_job_admin(self, client, admin_headers):
        response = client.post(
            "/api/jobs",
            json={
                "title": "New Role",
                "company": "AdminCorp",
                "location": "Delhi",
                "description": "Admin created job",
                "requirements": "Admin skills",
                "job_type": "full-time",
                "experience_level": "senior",
                "remote_type": "onsite",
            },
            headers=admin_headers,
        )
        assert response.status_code == 201
        assert response.json()["title"] == "New Role"

    def test_create_job_unauthorized(self, client, auth_headers):
        response = client.post(
            "/api/jobs",
            json={
                "title": "Should Fail",
                "company": "Test",
                "location": "Test",
                "description": "Test",
                "requirements": "Test",
                "job_type": "full-time",
                "experience_level": "mid",
                "remote_type": "onsite",
            },
            headers=auth_headers,
        )
        assert response.status_code == 403

    def test_delete_job_admin(self, client, db, admin_headers):
        job = self._create_job(db)
        response = client.delete(f"/api/jobs/{job.id}", headers=admin_headers)
        assert response.status_code == 204

    def test_search_jobs(self, client, db):
        self._create_job(db)
        response = client.get("/api/jobs?search=Software")
        assert response.status_code == 200
        assert response.json()["total"] == 1

    def test_filter_jobs_by_type(self, client, db):
        self._create_job(db)
        response = client.get("/api/jobs?job_type=full-time")
        assert response.status_code == 200
        assert response.json()["total"] == 1

        response = client.get("/api/jobs?job_type=part-time")
        assert response.json()["total"] == 0
