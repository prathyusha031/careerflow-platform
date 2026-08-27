import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  FileText,
  ArrowUpRight,
  MoreHorizontal,
  ArrowRight,
  Trash2,
} from 'lucide-react';
import { api } from '../services/api';
import type { Application } from '../types';
import { STATUS_LABELS } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';

const STAGES = ['applied', 'screening', 'interview', 'technical', 'final', 'offer', 'rejected'];

const STAGE_ORDER = STAGES.filter((s) => s !== 'rejected');

function formatDate(dateStr?: string) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      const data = await api.getApplications({ per_page: 100 });
      setApplications(data.applications);
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const updateStatus = async (appId: string, newStatus: string) => {
    try {
      await api.updateApplication(appId, { status: newStatus });
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a)),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update');
    }
  };

  const moveForward = (app: Application) => {
    const currentIndex = STAGE_ORDER.indexOf(app.status);
    if (currentIndex >= 0 && currentIndex < STAGE_ORDER.length - 1) {
      updateStatus(app.id, STAGE_ORDER[currentIndex + 1]);
    }
  };

  const moveBackward = (app: Application) => {
    const currentIndex = STAGE_ORDER.indexOf(app.status);
    if (currentIndex > 0) {
      updateStatus(app.id, STAGE_ORDER[currentIndex - 1]);
    }
  };

  const rejectApplication = (app: Application) => {
    updateStatus(app.id, 'rejected');
  };

  const deleteApplication = async (appId: string) => {
    if (!confirm('Are you sure you want to remove this application?')) return;
    try {
      await api.deleteApplication(appId);
      setApplications((prev) => prev.filter((a) => a.id !== appId));
    } catch {
      // handle error
    }
  };

  const getStageApplications = (stage: string) =>
    applications.filter((a) => a.status === stage);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-10 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-32 w-full mb-2" />
              <Skeleton className="h-32 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-surface-900 mb-8">Application Tracker</h1>
        <EmptyState
          icon={<Briefcase className="w-8 h-8 text-surface-400" />}
          title="No applications yet"
          description="Start applying to jobs and track your progress here. Your application pipeline will appear as a Kanban board."
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
    <div className="max-w-full mx-auto px-4 py-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-surface-900">Application Tracker</h1>
        <p className="mt-1 text-sm text-surface-500">
          {applications.length} total applications · {getStageApplications('interview').length}{' '}
          in interviews
        </p>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4">
        {STAGES.map((stage) => {
          const stageApps = getStageApplications(stage);
          const stageColor =
            stage === 'applied' ? 'bg-blue-500' :
            stage === 'screening' ? 'bg-yellow-500' :
            stage === 'interview' ? 'bg-purple-500' :
            stage === 'technical' ? 'bg-indigo-500' :
            stage === 'final' ? 'bg-orange-500' :
            stage === 'offer' ? 'bg-green-500' :
            'bg-red-500';

          return (
            <div key={stage} className="min-w-[270px] flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${stageColor}`} />
                <h3 className="text-xs font-semibold text-surface-700 uppercase tracking-wide">
                  {STATUS_LABELS[stage]}
                </h3>
                <span className="text-[11px] text-surface-400 bg-surface-100 rounded-full px-2 py-0.5 font-medium">
                  {stageApps.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {stageApps.map((app) => (
                  <Card key={app.id} className="p-3.5" hover>
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0">
                        <h4 className="font-medium text-surface-900 text-sm truncate">
                          {app.job?.title || 'Unknown Role'}
                        </h4>
                        <p className="text-xs text-surface-500 mt-0.5">{app.job?.company}</p>
                      </div>
                      <div className="relative shrink-0 ml-2">
                        <button
                          onClick={() => {
                            setActiveStage(activeStage === app.id ? null : app.id);
                          }}
                          className="p-1 rounded hover:bg-surface-100 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-surface-400" />
                        </button>
                        {activeStage === app.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setActiveStage(null)}
                            />
                            <div className="absolute right-0 top-8 bg-white rounded-xl shadow-lg border border-surface-200 py-1 z-50 w-44">
                              {STAGE_ORDER.indexOf(app.status) > 0 && (
                                <button
                                  onClick={() => {
                                    moveBackward(app);
                                    setActiveStage(null);
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm text-surface-700 hover:bg-surface-50"
                                >
                                  ← Move Back
                                </button>
                              )}
                              {STAGE_ORDER.indexOf(app.status) <
                                STAGE_ORDER.length - 1 && (
                                <button
                                  onClick={() => {
                                    moveForward(app);
                                    setActiveStage(null);
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm text-surface-700 hover:bg-surface-50"
                                >
                                  Move Forward →
                                </button>
                              )}
                              {app.status !== 'rejected' && (
                                <button
                                  onClick={() => {
                                    rejectApplication(app);
                                    setActiveStage(null);
                                  }}
                                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  Mark Rejected
                                </button>
                              )}
                              <hr className="my-1 border-surface-100" />
                              <button
                                onClick={() => {
                                  deleteApplication(app.id);
                                  setActiveStage(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3 inline mr-1.5" />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-surface-500">
                      {app.applied_at && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          Applied {formatDate(app.applied_at)}
                        </div>
                      )}
                      {app.interview_date && (
                        <div className="flex items-center gap-1.5 text-purple-600">
                          <Calendar className="w-3 h-3" />
                          Interview {formatDate(app.interview_date)}
                        </div>
                      )}
                      {app.next_action && (
                        <div className="flex items-center gap-1.5">
                          <ArrowRight className="w-3 h-3" />
                          {app.next_action}
                        </div>
                      )}
                    </div>

                    {app.notes && (
                      <p className="mt-2 text-xs text-surface-400 line-clamp-2 flex items-start gap-1">
                        <FileText className="w-3 h-3 mt-0.5 shrink-0" />
                        {app.notes}
                      </p>
                    )}

                    <div className="mt-2.5 pt-2 border-t border-surface-100 flex items-center justify-between">
                      {app.job?.location && (
                        <span className="text-xs text-surface-400">{app.job.location}</span>
                      )}
                      <Link
                        to={`/applications/${app.id}`}
                        className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-0.5"
                      >
                        Details
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </Card>
                ))}

                {stageApps.length === 0 && (
                  <div className="bg-surface-50 rounded-xl border border-dashed border-surface-200 p-5 text-center">
                    <p className="text-xs text-surface-400">No applications</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
