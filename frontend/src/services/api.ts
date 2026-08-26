import type {
  User,
  JobListResponse,
  Job,
  Application,
  SavedJob,
  Notification,
  Profile,
  DashboardStats,
} from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('cf_token', token);
    } else {
      localStorage.removeItem('cf_token');
    }
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('cf_token');
    }
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      this.setToken(null);
      window.location.href = '/login';
      throw new Error('Session expired. Please log in again.');
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(error.detail || 'An error occurred');
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  // Auth
  async register(name: string, email: string, password: string) {
    const data = await this.request<{ access_token: string; user: User }>(
      '/auth/register',
      { method: 'POST', body: JSON.stringify({ name, email, password }) },
    );
    this.setToken(data.access_token);
    return data;
  }

  async login(email: string, password: string) {
    const data = await this.request<{ access_token: string; user: User }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) },
    );
    this.setToken(data.access_token);
    return data;
  }

  async getMe() {
    return this.request<User>('/auth/me');
  }

  logout() {
    this.setToken(null);
  }

  // Jobs
  async getJobs(params: Record<string, string | number | undefined> = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.set(key, String(value));
      }
    });
    return this.request<JobListResponse>(`/jobs?${searchParams.toString()}`);
  }

  async getJob(id: string) {
    return this.request<Job>(`/jobs/${id}`);
  }

  // Saved Jobs
  async getSavedJobs() {
    return this.request<SavedJob[]>('/saved-jobs');
  }

  async saveJob(jobId: string) {
    return this.request<SavedJob>(`/saved-jobs/${jobId}`, { method: 'POST' });
  }

  async unsaveJob(jobId: string) {
    return this.request<void>(`/saved-jobs/${jobId}`, { method: 'DELETE' });
  }

  // Applications
  async getApplications(params: Record<string, string | number | undefined> = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        searchParams.set(key, String(value));
      }
    });
    return this.request<{ applications: Application[]; total: number }>(
      `/applications?${searchParams.toString()}`,
    );
  }

  async createApplication(data: { job_id: string; notes?: string; next_action?: string }) {
    return this.request<Application>('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getApplication(id: string) {
    return this.request<Application>(`/applications/${id}`);
  }

  async updateApplication(id: string, data: Record<string, unknown>) {
    return this.request<Application>(`/applications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteApplication(id: string) {
    return this.request<void>(`/applications/${id}`, { method: 'DELETE' });
  }

  // Profile
  async getProfile() {
    return this.request<Profile>('/profile');
  }

  async updateProfile(data: Record<string, string | null>) {
    return this.request<Profile>('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Notifications
  async getNotifications() {
    return this.request<{ notifications: Notification[]; unread_count: number }>(
      '/notifications',
    );
  }

  async markNotificationRead(id: string) {
    return this.request<Notification>(`/notifications/${id}/read`, { method: 'PUT' });
  }

  async markAllNotificationsRead() {
    return this.request<{ message: string }>('/notifications/read-all', { method: 'PUT' });
  }

  // Dashboard
  async getDashboard() {
    return this.request<DashboardStats>('/dashboard');
  }

  // Admin
  async adminGetUsers() {
    return this.request<User[]>('/admin/users');
  }

  async adminCreateJob(data: Record<string, unknown>) {
    return this.request<Job>('/admin/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async adminUpdateJob(id: string, data: Record<string, unknown>) {
    return this.request<Job>(`/admin/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async adminDeleteJob(id: string) {
    return this.request<void>(`/admin/jobs/${id}`, { method: 'DELETE' });
  }
}

export const api = new ApiClient();
