import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Mail,
  User,
  FileText,
  Clock,
  CheckCircle2,
  Circle,
  Save,
  Trash2,
} from 'lucide-react';
import { api } from '../services/api';
import type { Application } from '../types';
import { STATUS_LABELS, STATUS_COLORS } from '../types';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Skeleton from '../components/ui/Skeleton';

const TIMELINE_STAGES = ['applied', 'screening', 'interview', 'technical', 'final', 'offer'];

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    notes: '',
    next_action: '',
    interview_date: '',
    recruiter_name: '',
    recruiter_email: '',
    status: '',
  });

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await api.getApplication(id);
        setApp(data);
        setForm({
          notes: data.notes || '',
          next_action: data.next_action || '',
          interview_date: data.interview_date ? data.interview_date.slice(0, 16) : '',
          recruiter_name: data.recruiter_name || '',
          recruiter_email: data.recruiter_email || '',
          status: data.status,
        });
      } catch {
        navigate('/applications');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await api.updateApplication(id!, {
        notes: form.notes || null,
        next_action: form.next_action || null,
        interview_date: form.interview_date || null,
        recruiter_name: form.recruiter_name || null,
        recruiter_email: form.recruiter_email || null,
        status: form.status,
      });
      setApp(updated);
      setEditing(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await api.deleteApplication(id!);
      navigate('/applications');
    } catch {
      // handle error
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!app) return null;

  const currentIndex = TIMELINE_STAGES.indexOf(app.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <Link
        to="/applications"
        className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Applications
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-surface-200 p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-surface-900">{app.job?.title || 'Application'}</h1>
            <div className="flex items-center gap-3 mt-2 text-surface-600">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                {app.job?.company}
              </span>
              {app.job?.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {app.job.location}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
              {editing ? 'Cancel' : 'Edit'}
            </Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge className={`${STATUS_COLORS[app.status]}`}>
            {STATUS_LABELS[app.status]}
          </Badge>
          <Badge variant="default">
            Applied {new Date(app.applied_at).toLocaleDateString()}
          </Badge>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-surface-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-surface-900 mb-6">Application Progress</h2>
        <div className="flex items-center justify-between">
          {TIMELINE_STAGES.map((stage, index) => (
            <div key={stage} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    index <= currentIndex
                      ? 'bg-primary-600 text-white'
                      : 'bg-surface-100 text-surface-400'
                  }`}
                >
                  {index < currentIndex ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : index === currentIndex ? (
                    <Circle className="w-5 h-5 fill-current" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`text-xs mt-2 text-center hidden sm:block ${
                    index <= currentIndex ? 'text-primary-700 font-medium' : 'text-surface-400'
                  }`}
                >
                  {STATUS_LABELS[stage]}
                </span>
              </div>
              {index < TIMELINE_STAGES.length - 1 && (
                <div
                  className={`w-8 sm:w-16 h-0.5 mx-1 ${
                    index < currentIndex ? 'bg-primary-600' : 'bg-surface-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      {editing ? (
        <div className="bg-white rounded-2xl border border-surface-200 p-6">
          <h2 className="text-lg font-semibold text-surface-900 mb-4">Edit Application</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {TIMELINE_STAGES.concat(['rejected']).map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <Input
              label="Interview Date"
              type="datetime-local"
              value={form.interview_date}
              onChange={(e) => setForm({ ...form, interview_date: e.target.value })}
            />
            <Input
              label="Recruiter Name"
              value={form.recruiter_name}
              onChange={(e) => setForm({ ...form, recruiter_name: e.target.value })}
              placeholder="John Doe"
            />
            <Input
              label="Recruiter Email"
              type="email"
              value={form.recruiter_email}
              onChange={(e) => setForm({ ...form, recruiter_email: e.target.value })}
              placeholder="john@company.com"
            />
            <Input
              label="Next Action"
              value={form.next_action}
              onChange={(e) => setForm({ ...form, next_action: e.target.value })}
              placeholder="Follow up next week"
            />
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-surface-700 mb-1">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Add notes about this application..."
                className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 h-24 resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} loading={saving}>
              <Save className="w-4 h-4 mr-1.5" />
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">Details</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-surface-400" />
                <dt className="text-surface-500 w-28">Applied</dt>
                <dd className="text-surface-700">{new Date(app.applied_at).toLocaleDateString()}</dd>
              </div>
              {app.interview_date && (
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <dt className="text-surface-500 w-28">Interview</dt>
                  <dd className="text-surface-700">
                    {new Date(app.interview_date).toLocaleString()}
                  </dd>
                </div>
              )}
              {app.recruiter_name && (
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-surface-400" />
                  <dt className="text-surface-500 w-28">Recruiter</dt>
                  <dd className="text-surface-700">{app.recruiter_name}</dd>
                </div>
              )}
              {app.recruiter_email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-surface-400" />
                  <dt className="text-surface-500 w-28">Email</dt>
                  <dd className="text-surface-700">{app.recruiter_email}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="bg-white rounded-2xl border border-surface-200 p-6">
            <h2 className="text-lg font-semibold text-surface-900 mb-4">Next Steps</h2>
            {app.next_action ? (
              <div className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg">
                <ArrowLeft className="w-4 h-4 text-primary-600 mt-0.5 rotate-90" />
                <p className="text-sm text-primary-700">{app.next_action}</p>
              </div>
            ) : (
              <p className="text-sm text-surface-500">No next action set. Click Edit to add one.</p>
            )}

            {app.notes && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-surface-700 mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Notes
                </h3>
                <p className="text-sm text-surface-600 whitespace-pre-line">{app.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
