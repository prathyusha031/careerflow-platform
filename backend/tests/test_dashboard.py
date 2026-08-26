import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


class TestDashboard:
    def test_dashboard_empty(self, client, auth_headers):
        response = client.get("/api/dashboard", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["total_applications"] == 0
        assert data["active_applications"] == 0

    def test_dashboard_unauthenticated(self, client):
        response = client.get("/api/dashboard")
        assert response.status_code == 401
