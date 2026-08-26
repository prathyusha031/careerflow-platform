import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


class TestAuth:
    def test_register_success(self, client):
        response = client.post(
            "/api/auth/register",
            json={
                "name": "New User",
                "email": "new@example.com",
                "password": "Password123!",
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert "access_token" in data
        assert data["user"]["email"] == "new@example.com"
        assert data["user"]["name"] == "New User"
        assert data["user"]["role"] == "user"

    def test_register_duplicate_email(self, client, test_user):
        response = client.post(
            "/api/auth/register",
            json={
                "name": "Duplicate",
                "email": "test@example.com",
                "password": "Password123!",
            },
        )
        assert response.status_code == 409

    def test_register_short_password(self, client):
        response = client.post(
            "/api/auth/register",
            json={
                "name": "User",
                "email": "short@example.com",
                "password": "123",
            },
        )
        assert response.status_code == 422

    def test_login_success(self, client, test_user):
        response = client.post(
            "/api/auth/login",
            json={
                "email": "test@example.com",
                "password": "TestPass123!",
            },
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["user"]["email"] == "test@example.com"

    def test_login_invalid_credentials(self, client, test_user):
        response = client.post(
            "/api/auth/login",
            json={
                "email": "test@example.com",
                "password": "WrongPassword!",
            },
        )
        assert response.status_code == 401

    def test_login_nonexistent_user(self, client):
        response = client.post(
            "/api/auth/login",
            json={
                "email": "nonexistent@example.com",
                "password": "Password123!",
            },
        )
        assert response.status_code == 401

    def test_get_me_authenticated(self, client, auth_headers, test_user):
        response = client.get("/api/auth/me", headers=auth_headers)
        assert response.status_code == 200
        assert response.json()["email"] == "test@example.com"

    def test_get_me_unauthenticated(self, client):
        response = client.get("/api/auth/me")
        assert response.status_code == 401
