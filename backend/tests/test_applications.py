import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.models.job import Job


class TestApplications:
    def _create_job(self, db):
        job = Job(
            title="Test Job",
            company="TestCo",
            location="Hyderabad",
            description="Test description",
            requirements="Test requirements",
            job_type="full-time",
            experience_level="mid",
            remote_type="onsite",
        )
        db.add(job)
        db.commit()
        db.refresh(job)
        return job

    def test_create_application(self, client, db, auth_headers):
        job = self._create_job(db)
        response = client.post(
            "/api/applications",
            json={"job_id": job.id, "notes": "Excited about this role"},
            headers=auth_headers,
        )
        assert response.status_code == 201
        data = response.json()
        assert data["status"] == "applied"
        assert data["job_id"] == job.id

    def test_create_duplicate_application(self, client, db, auth_headers):
        job = self._create_job(db)
        client.post(
            "/api/applications",
            json={"job_id": job.id},
            headers=auth_headers,
        )
        response = client.post(
            "/api/applications",
            json={"job_id": job.id},
            headers=auth_headers,
        )
        assert response.status_code == 409

    def test_list_applications(self, client, db, auth_headers):
        job = self._create_job(db)
        client.post(
            "/api/applications",
            json={"job_id": job.id},
            headers=auth_headers,
        )
        response = client.get("/api/applications", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["total"] == 1

    def test_update_application_status(self, client, db, auth_headers):
        job = self._create_job(db)
        create_resp = client.post(
            "/api/applications",
            json={"job_id": job.id},
            headers=auth_headers,
        )
        app_id = create_resp.json()["id"]

        response = client.put(
            f"/api/applications/{app_id}",
            json={"status": "interview", "next_action": "Prepare for technical round"},
            headers=auth_headers,
        )
        assert response.status_code == 200
        assert response.json()["status"] == "interview"

    def test_delete_application(self, client, db, auth_headers):
        job = self._create_job(db)
        create_resp = client.post(
            "/api/applications",
            json={"job_id": job.id},
            headers=auth_headers,
        )
        app_id = create_resp.json()["id"]

        response = client.delete(f"/api/applications/{app_id}", headers=auth_headers)
        assert response.status_code == 204

    def test_unauthorized_application_list(self, client):
        response = client.get("/api/applications")
        assert response.status_code == 401
