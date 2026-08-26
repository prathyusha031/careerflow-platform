export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string;
  responsibilities?: string;
  salary_min?: number;
  salary_max?: number;
  job_type: string;
  experience_level: string;
  remote_type: string;
  skills?: string;
  benefits?: string;
  created_at: string;
  updated_at: string;
}

export interface JobListResponse {
  jobs: Job[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

export interface Application {
  id: string;
  user_id: string;
  job_id: string;
  status: string;
  applied_at: string;
  notes?: string;
  next_action?: string;
  interview_date?: string;
  recruiter_name?: string;
  recruiter_email?: string;
  job_url?: string;
  created_at: string;
  updated_at: string;
  job?: {
    id: string;
    title: string;
    company: string;
    location: string;
    job_type: string;
    salary_min?: number;
    salary_max?: number;
  };
}

export interface SavedJob {
  id: string;
  job_id: string;
  created_at: string;
  job?: {
    id: string;
    title: string;
    company: string;
    location: string;
    job_type: string;
    salary_min?: number;
    salary_max?: number;
    remote_type: string;
    skills?: string;
    created_at: string;
  };
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  notification_type: string;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  skills?: string;
  experience?: string;
  education?: string;
  preferred_locations?: string;
  preferred_job_types?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_applications: number;
  active_applications: number;
  interviews: number;
  offers: number;
  rejections: number;
  saved_jobs: number;
  response_rate: number;
  interview_rate: number;
  applications_over_time: { month: string; count: number }[];
  applications_by_status: { status: string; count: number }[];
  conversion_funnel: { stage: string; count: number }[];
}

export type ApplicationStatus =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'technical'
  | 'final'
  | 'offer'
  | 'rejected';

export const STATUS_LABELS: Record<string, string> = {
  applied: 'Applied',
  screening: 'Screening',
  interview: 'Interview',
  technical: 'Technical Round',
  final: 'Final Round',
  offer: 'Offer',
  rejected: 'Rejected',
};

export const STATUS_COLORS: Record<string, string> = {
  applied: 'bg-blue-100 text-blue-800',
  screening: 'bg-yellow-100 text-yellow-800',
  interview: 'bg-purple-100 text-purple-800',
  technical: 'bg-indigo-100 text-indigo-800',
  final: 'bg-orange-100 text-orange-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export const JOB_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  contract: 'Contract',
  internship: 'Internship',
};

export const EXPERIENCE_LABELS: Record<string, string> = {
  entry: 'Entry Level',
  mid: 'Mid Level',
  senior: 'Senior',
  lead: 'Lead',
};
