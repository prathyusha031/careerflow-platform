import { useState, useEffect } from 'react';
import { Shield, Users, Briefcase, Plus, Pencil, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import type { User as UserType, Job } from '../types';
import { JOB_TYPE_LABELS, EXPERIENCE_LABELS } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Skeleton from '../components/ui/Skeleton';

export default function Admin() {
  const [tab, setTab] = useState<'jobs' | 'users'>('jobs');
  const [users, setUsers] = useState<UserType[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showJobModal, setShowJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    responsibilities: '',
    salary_min: '',
    salary_max: '',
    job_type: 'full-time',
    experience_level: 'mid',
    remote_type: 'onsite',
    skills: '',
    benefits: '',
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [usersData, jobsData] = await Promise.all([
          api.adminGetUsers(),
          api.getJobs({ per_page: 50 }),
        ]);
        setUsers(usersData);
        setJobs(jobsData.jobs);
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const resetJobForm = () => {
    setJobForm({
      title: '',
      company: '',
      location: '',
      description: '',
      requirements: '',
      responsibilities: '',
      salary_min: '',
      salary_max: '',
      job_type: 'full-time',
      experience_level: 'mid',
      remote_type: 'onsite',
      skills: '',
      benefits: '',
    });
    setEditingJob(null);
  };

  const openCreateJob = () => {
    resetJobForm();
    setShowJobModal(true);
  };

  const openEditJob = (job: Job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      requirements: job.requirements,
      responsibilities: job.responsibilities || '',
      salary_min: job.salary_min?.toString() || '',
      salary_max: job.salary_max?.toString() || '',
      job_type: job.job_type,
      experience_level: job.experience_level,
      remote_type: job.remote_type,
      skills: job.skills || '',
      benefits: job.benefits || '',
    });
    setShowJobModal(true);
  };

  const saveJob = async () => {
    const payload = {
      ...jobForm,
      salary_min: jobForm.salary_min ? parseInt(jobForm.salary_min) : null,
      salary_max: jobForm.salary_max ? parseInt(jobForm.salary_max) : null,
      skills: jobForm.skills || null,
      benefits: jobForm.benefits || null,
      responsibilities: jobForm.responsibilities || null,
    };

    try {
      if (editingJob) {
        const updated = await api.adminUpdateJob(editingJob.id, payload);
        setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
      } else {
        const created = await api.adminCreateJob(payload);
        setJobs((prev) => [created, ...prev]);
      }
      setShowJobModal(false);
      resetJobForm();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save job');
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await api.adminDeleteJob(jobId);
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
    } catch {
      // handle error
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-10 w-48 mb-8" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-primary-600" />
        <h1 className="text-2xl font-bold text-surface-900">Admin Panel</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-surface-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setTab('jobs')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === 'jobs' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-600 hover:text-surface-900'
          }`}
        >
          <Briefcase className="w-4 h-4 inline mr-1.5" />
          Jobs ({jobs.length})
        </button>
        <button
          onClick={() => setTab('users')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            tab === 'users' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-600 hover:text-surface-900'
          }`}
        >
          <Users className="w-4 h-4 inline mr-1.5" />
          Users ({users.length})
        </button>
      </div>

      {/* Jobs Tab */}
      {tab === 'jobs' && (
        <div>
          <div className="flex justify-end mb-4">
            <Button onClick={openCreateJob}>
              <Plus className="w-4 h-4 mr-1.5" />
              Create Job
            </Button>
          </div>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-200">
                    <th className="text-left px-4 py-3 font-medium text-surface-600">Title</th>
                    <th className="text-left px-4 py-3 font-medium text-surface-600">Company</th>
                    <th className="text-left px-4 py-3 font-medium text-surface-600">Location</th>
                    <th className="text-left px-4 py-3 font-medium text-surface-600">Type</th>
                    <th className="text-left px-4 py-3 font-medium text-surface-600">Level</th>
                    <th className="text-right px-4 py-3 font-medium text-surface-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-surface-50">
                      <td className="px-4 py-3 font-medium text-surface-900">{job.title}</td>
                      <td className="px-4 py-3 text-surface-600">{job.company}</td>
                      <td className="px-4 py-3 text-surface-600">{job.location}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                          {JOB_TYPE_LABELS[job.job_type]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-surface-600">
                        {EXPERIENCE_LABELS[job.experience_level]}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => openEditJob(job)}
                          className="p-1.5 rounded hover:bg-surface-100 text-surface-500 hover:text-surface-700"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-surface-500 hover:text-red-600 ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {tab === 'users' && (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-200">
                  <th className="text-left px-4 py-3 font-medium text-surface-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600">Email</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-surface-600">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-surface-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-surface-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-surface-100 text-surface-600'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-surface-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Job Modal */}
      <Modal
        isOpen={showJobModal}
        onClose={() => {
          setShowJobModal(false);
          resetJobForm();
        }}
        title={editingJob ? 'Edit Job' : 'Create Job'}
        size="lg"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Title"
              value={jobForm.title}
              onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
              required
            />
            <Input
              label="Company"
              value={jobForm.company}
              onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
              required
            />
            <Input
              label="Location"
              value={jobForm.location}
              onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Job Type</label>
              <select
                value={jobForm.job_type}
                onChange={(e) => setJobForm({ ...jobForm, job_type: e.target.value })}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Experience</label>
              <select
                value={jobForm.experience_level}
                onChange={(e) => setJobForm({ ...jobForm, experience_level: e.target.value })}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior</option>
                <option value="lead">Lead</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Remote Type</label>
              <select
                value={jobForm.remote_type}
                onChange={(e) => setJobForm({ ...jobForm, remote_type: e.target.value })}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">Onsite</option>
              </select>
            </div>
            <Input
              label="Salary Min (₹)"
              type="number"
              value={jobForm.salary_min}
              onChange={(e) => setJobForm({ ...jobForm, salary_min: e.target.value })}
            />
            <Input
              label="Salary Max (₹)"
              type="number"
              value={jobForm.salary_max}
              onChange={(e) => setJobForm({ ...jobForm, salary_max: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Description</label>
            <textarea
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 h-24 resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Requirements</label>
            <textarea
              value={jobForm.requirements}
              onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
              className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 h-24 resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">Responsibilities</label>
            <textarea
              value={jobForm.responsibilities}
              onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
              className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 h-24 resize-none"
            />
          </div>
          <Input
            label="Skills (JSON array)"
            value={jobForm.skills}
            onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
            placeholder='["React", "TypeScript", "Python"]'
          />
        </div>
        <div className="flex gap-3 mt-4 pt-4 border-t border-surface-200">
          <Button variant="outline" onClick={() => { setShowJobModal(false); resetJobForm(); }} className="flex-1">
            Cancel
          </Button>
          <Button onClick={saveJob} className="flex-1">
            {editingJob ? 'Update Job' : 'Create Job'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
