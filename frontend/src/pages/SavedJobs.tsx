import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Building2, ExternalLink, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import type { SavedJob } from '../types';
import { JOB_TYPE_LABELS } from '../types';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return null;
  const format = (n: number) => `₹${(n / 100000).toFixed(1)}L`;
  if (min && max) return `${format(min)} - ${format(max)}/yr`;
  if (min) return `From ${format(min)}/yr`;
  return `Up to ${format(max!)}/yr`;
}

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getSavedJobs();
        setSavedJobs(data);
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const unsave = async (jobId: string) => {
    try {
      await api.unsaveJob(jobId);
      setSavedJobs((prev) => prev.filter((s) => s.job_id !== jobId));
    } catch {
      // handle error
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (savedJobs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-8">Saved Jobs</h1>
        <EmptyState
          icon={<Bookmark className="w-8 h-8 text-surface-400" />}
          title="No saved jobs yet"
          description="Save interesting job listings to review later. You can save jobs from the job listings page."
          action={
            <Link to="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900">Saved Jobs</h1>
        <p className="mt-1 text-surface-600">
          {savedJobs.length} {savedJobs.length === 1 ? 'job' : 'jobs'} saved
        </p>
      </div>

      <div className="space-y-4">
        {savedJobs.map((saved) => {
          const job = saved.job;
          if (!job) return null;
          return (
            <Card key={saved.id} className="p-5" hover>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="min-w-0">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-lg font-semibold text-surface-900 hover:text-primary-600 transition-colors"
                      >
                        {job.title}
                      </Link>
                      <p className="text-sm text-surface-600 mt-0.5">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-surface-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.location}
                        </span>
                        <Badge variant="primary">
                          {JOB_TYPE_LABELS[job.job_type] || job.job_type}
                        </Badge>
                        <Badge variant="info">{job.remote_type}</Badge>
                        {(job.salary_min || job.salary_max) && (
                          <span className="text-green-600 font-medium text-sm">
                            {formatSalary(job.salary_min, job.salary_max)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <Link to={`/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => unsave(job.id)}
                    className="text-danger-500 hover:text-danger-700 hover:bg-danger-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
