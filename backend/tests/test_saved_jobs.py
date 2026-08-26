import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from app.models.job import Job


class TestSavedJobs:
    def _create_job(self, db):
        job = Job(
            title="Saveable Job",
            company="SaveCo",
            location="Pune",
            description="Save me",
            requirements="None",
            job_type="full-time",
            experience_level="entry",
            remote_type="remote",
        )
        db.add(job)
        db.commit()
        db.refresh(job)
        return job

    def test_save_job(self, client, db, auth_headers):
        job = self._create_job(db)
        response = client.post(f"/api/saved-jobs/{job.id}", headers=auth_headers)
        assert response.status_code == 201

    def test_list_saved_jobs(self, client, db, auth_headers):
        job = self._create_job(db)
        client.post(f"/api/saved-jobs/{job.id}", headers=auth_headers)
        response = client.get("/api/saved-jobs", headers=auth_headers)
        assert response.status_code == 200
        assert len(response.json()) == 1

    def test_unsave_job(self, client, db, auth_headers):
        job = self._create_job(db)
        client.post(f"/api/saved-jobs/{job.id}", headers=auth_headers)
        response = client.delete(f"/api/saved-jobs/{job.id}", headers=auth_headers)
        assert response.status_code == 204

    def test_save_duplicate_job(self, client, db, auth_headers):
        job = self._create_job(db)
        client.post(f"/api/saved-jobs/{job.id}", headers=auth_headers)
        response = client.post(f"/api/saved-jobs/{job.id}", headers=auth_headers)
        assert response.status_code == 409

    def test_save_nonexistent_job(self, client, auth_headers):
        response = client.post("/api/saved-jobs/nonexistent", headers=auth_headers)
        assert response.status_code == 404
