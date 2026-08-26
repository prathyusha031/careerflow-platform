import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


class TestAdmin:
    def test_list_users_as_admin(self, client, admin_headers, test_user):
        response = client.get("/api/admin/users", headers=admin_headers)
        assert response.status_code == 200
        assert len(response.json()) >= 1

    def test_list_users_unauthorized(self, client, auth_headers):
        response = client.get("/api/admin/users", headers=auth_headers)
        assert response.status_code == 403

    def test_admin_create_job(self, client, admin_headers):
        response = client.post(
            "/api/admin/jobs",
            json={
                "title": "Admin Job",
                "company": "AdminCorp",
                "location": "Delhi",
                "description": "Admin job",
                "requirements": "None",
                "job_type": "full-time",
                "experience_level": "entry",
                "remote_type": "onsite",
            },
            headers=admin_headers,
        )
        assert response.status_code == 201
        assert response.json()["title"] == "Admin Job"

    def test_list_all_applications_as_admin(self, client, admin_headers):
        response = client.get("/api/admin/applications", headers=admin_headers)
        assert response.status_code == 200
