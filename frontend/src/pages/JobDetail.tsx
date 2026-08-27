import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Building2,
  Clock,
  Bookmark,
  BookmarkCheck,
  DollarSign,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../services/api';
import type { Job } from '../types';
import { JOB_TYPE_LABELS, EXPERIENCE_LABELS } from '../types';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return 'Not specified';

  const format = (n: number) => `₹${(n / 100000).toFixed(1)}L`;

  if (min && max) return `${format(min)} - ${format(max)}/year`;
  if (min) return `From ${format(min)}/year`;
  return `Up to ${format(max!)}/year`;
}
export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!id) return;
    const loadJob = async () => {
      try {
        const data = await api.getJob(id);
        setJob(data);
      } catch {
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [id, navigate]);

  useEffect(() => {
    if (!id) return;
    const checkSaved = async () => {
      try {
        const savedList = await api.getSavedJobs();
        setSaved(savedList.some((s) => s.job_id === id));
      } catch {
        // not logged in
      }
    };
    checkSaved();
  }, [id]);

  const toggleSave = async () => {
    if (!id) return;
    try {
      if (saved) {
        await api.unsaveJob(id);
        setSaved(false);
      } else {
        await api.saveJob(id);
        setSaved(true);
      }
    } catch {
      navigate('/login');
    }
  };

  const handleApply = async () => {
    if (!id) return;
    setApplying(true);
    try {
      await api.createApplication({ job_id: id, notes: notes || undefined });
      setApplied(true);
      setShowApplyModal(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!job) return null;

  const skills = job.skills
  ? job.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
  : [];
  const benefits = job.benefits
  ? job.benefits.split(",").map((benefit) => benefit.trim()).filter(Boolean)
  : [];
  const requirements = job.requirements.split('\n').filter(Boolean);
  const responsibilities = job.responsibilities?.split('\n').filter(Boolean) || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Jobs
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-surface-200 p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-surface-600">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                {job.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Posted {new Date(job.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="primary">{JOB_TYPE_LABELS[job.job_type]}</Badge>
              <Badge>{EXPERIENCE_LABELS[job.experience_level]}</Badge>
              <Badge variant="info">{job.remote_type}</Badge>
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" onClick={toggleSave}>
              {saved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 mr-1.5" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 mr-1.5" />
                  Save
                </>
              )}
            </Button>
            <Button
              onClick={() => setShowApplyModal(true)}
              disabled={applied}
            >
              {applied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Applied
                </>
              ) : (
                'Apply Now'
              )}
            </Button>
          </div>
        </div>

        {(job.salary_min || job.salary_max) && (
          <div className="mt-4 flex items-center gap-2 text-lg font-semibold text-green-700">
            <DollarSign className="w-5 h-5" />
            {formatSalary(job.salary_min, job.salary_max)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">About the Role</h2>
            <p className="text-surface-600 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {requirements.length > 0 && (
            <div className="bg-white rounded-2xl border border-surface-200 p-6">
              <h2 className="text-lg font-semibold text-surface-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-surface-600">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {responsibilities.length > 0 && (
            <div className="bg-white rounded-2xl border border-surface-200 p-6">
              <h2 className="text-lg font-semibold text-surface-900 mb-4">Responsibilities</h2>
              <ul className="space-y-2">
                {responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2 text-surface-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {skills.length > 0 && (
            <div className="bg-white rounded-2xl border border-surface-200 p-6">
              <h3 className="font-semibold text-surface-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {benefits.length > 0 && (
            <div className="bg-white rounded-2xl border border-surface-200 p-6">
              <h3 className="font-semibold text-surface-900 mb-3">Benefits</h3>
              <ul className="space-y-2">
                {benefits.map((benefit: string) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-surface-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <h3 className="font-semibold text-surface-900 mb-3">Job Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-surface-500">Job Type</dt>
                <dd className="text-surface-700 font-medium">{JOB_TYPE_LABELS[job.job_type]}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-surface-500">Experience</dt>
                <dd className="text-surface-700 font-medium">{EXPERIENCE_LABELS[job.experience_level]}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-surface-500">Work Style</dt>
                <dd className="text-surface-700 font-medium capitalize">{job.remote_type}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-surface-500">Location</dt>
                <dd className="text-surface-700 font-medium">{job.location}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowApplyModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl mx-4 max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">Apply for {job.title}</h2>
            <p className="text-sm text-surface-600 mb-4">
              You are applying to {job.company} for the {job.title} position.
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about your application (optional)"
              className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 h-24 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowApplyModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                loading={applying}
                className="flex-1"
              >
                Submit Application
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


