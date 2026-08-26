import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Clock,
  Building2,
  Filter,
  X,
} from 'lucide-react';
import { api } from '../services/api';
import type { Job } from '../types';
import { JOB_TYPE_LABELS, EXPERIENCE_LABELS } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';

const REMOTE_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'Onsite' },
];

const JOB_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'full-time', label: 'Full Time' },
  { value: 'part-time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
];

const EXPERIENCE_LEVELS = [
  { value: '', label: 'All Levels' },
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'salary_high', label: 'Salary: High to Low' },
  { value: 'salary_low', label: 'Salary: Low to High' },
];

function formatSalary(min?: number, max?: number) {
  if (!min && !max) return null;

  const format = (n: number) => `₹${Math.round(n / 1000)}K`;

  if (min && max) return `${format(min)} - ${format(max)}/month`;
  if (min) return `From ${format(min)}/month`;
  return `Up to ${format(max!)}/month`;
}
function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [remoteType, setRemoteType] = useState('');
  const [sort, setSort] = useState('newest');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getJobs({
        page,
        per_page: 12,
        search: search || undefined,
        location: location || undefined,
        job_type: jobType || undefined,
        experience_level: experienceLevel || undefined,
        remote_type: remoteType || undefined,
        sort,
      });
      setJobs(data.jobs);
      setTotal(data.total);
      setPages(data.pages);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [page, search, location, jobType, experienceLevel, remoteType, sort]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const loadSaved = async () => {
      try {
        const saved = await api.getSavedJobs();
        setSavedJobs(new Set(saved.map((s) => s.job_id)));
      } catch {
        // not logged in
      }
    };
    loadSaved();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const toggleSave = async (jobId: string) => {
    try {
      if (savedJobs.has(jobId)) {
        await api.unsaveJob(jobId);
        setSavedJobs((prev) => {
          const next = new Set(prev);
          next.delete(jobId);
          return next;
        });
      } else {
        await api.saveJob(jobId);
        setSavedJobs((prev) => new Set(prev).add(jobId));
      }
    } catch {
      // must be logged in
    }
  };

  const clearFilters = () => {
    setSearchInput('');
    setSearch('');
    setLocation('');
    setJobType('');
    setExperienceLevel('');
    setRemoteType('');
    setSort('newest');
    setPage(1);
  };

  const hasFilters = search || location || jobType || experienceLevel || remoteType;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">Find Your Next Role</h1>
        <p className="mt-1 text-surface-500">
          {total} {total === 1 ? 'opportunity' : 'opportunities'} available
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-surface-700 mb-3">Job Type</h3>
              <div className="space-y-1">
                {JOB_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => { setJobType(t.value); setPage(1); }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      jobType === t.value
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-surface-600 hover:bg-surface-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-surface-700 mb-3">Experience</h3>
              <div className="space-y-1">
                {EXPERIENCE_LEVELS.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => { setExperienceLevel(l.value); setPage(1); }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      experienceLevel === l.value
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-surface-600 hover:bg-surface-50'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-surface-700 mb-3">Work Style</h3>
              <div className="space-y-1">
                {REMOTE_OPTIONS.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => { setRemoteType(r.value); setPage(1); }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      remoteType === r.value
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-surface-600 hover:bg-surface-50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by title, company, or keyword..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                />
              </div>
              <div className="relative w-40 hidden sm:block">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                />
              </div>
              <Button type="submit" className="shrink-0">
                <Search className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="shrink-0 lg:hidden"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Mobile Filters */}
          <div className={`mb-6 lg:hidden ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-xl border border-surface-200 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-surface-700">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-surface-400 hover:text-surface-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <select
                value={jobType}
                onChange={(e) => { setJobType(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-lg border border-surface-300 text-sm bg-white"
              >
                {JOB_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              <select
                value={experienceLevel}
                onChange={(e) => { setExperienceLevel(e.target.value); setPage(1); }}
                className="w-full px-3 py-2 rounded-lg border border-surface-300 text-sm bg-white"
              >
                {EXPERIENCE_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-surface-300 text-sm bg-white"
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex rounded-lg border border-surface-300 overflow-hidden">
                {REMOTE_OPTIONS.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => { setRemoteType(r.value); setPage(1); }}
                    className={`px-3 py-1.5 text-sm transition-colors hidden sm:inline-flex ${
                      remoteType === r.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-surface-600 hover:bg-surface-50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-surface-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

      {/* Job Cards */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-5">
              <Skeleton className="h-5 w-3/4 mb-3" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-3 w-full mb-2" />
              <Skeleton className="h-3 w-2/3 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16">
          <Briefcase className="w-12 h-12 text-surface-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-800 mb-2">No jobs found</h3>
          <p className="text-surface-500 mb-4">Try adjusting your search or filters</p>
          {hasFilters && (
            <Button variant="outline" onClick={clearFilters}>
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <Card key={job.id} hover className="p-5 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-surface-900 truncate">{job.title}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-sm text-surface-600">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{job.company}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSave(job.id);
                  }}
                  className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors shrink-0 ml-2"
                >
                  {savedJobs.has(job.id) ? (
                    <BookmarkCheck className="w-5 h-5 text-primary-600" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-surface-400" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 text-sm text-surface-500 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </span>
                {job.salary_min || job.salary_max ? (
                  <span className="text-green-600 font-medium">
                    {formatSalary(job.salary_min, job.salary_max)}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                <Badge variant="primary">{JOB_TYPE_LABELS[job.job_type] || job.job_type}</Badge>
                <Badge>{EXPERIENCE_LABELS[job.experience_level] || job.experience_level}</Badge>
                <Badge variant="info">{job.remote_type}</Badge>
              </div>

             {job.skills && (
  <div className="flex flex-wrap gap-1 mb-4">
    {job.skills
      .split(",")
      .map((skill: string) => skill.trim())
      .filter(Boolean)
      .slice(0, 3)
      .map((skill: string) => (
        <span
          key={skill}
          className="px-2 py-0.5 bg-surface-100 text-surface-600 rounded text-xs"
        >
          {skill}
        </span>
      ))}

    {job.skills.split(",").filter((skill: string) => skill.trim()).length > 3 && (
      <span className="px-2 py-0.5 text-surface-400 text-xs">
        +{job.skills.split(",").filter((skill: string) => skill.trim()).length - 3}
      </span>
    )}
  </div>
)}

              <div className="mt-auto pt-3 border-t border-surface-100 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-surface-400">
                  <Clock className="w-3 h-3" />
                  {timeAgo(job.created_at)}
                </span>
                <Link
                  to={`/jobs/${job.id}`}
                  className="text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View Details â†’
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-surface-600 px-3">
            Page {page} of {pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}


