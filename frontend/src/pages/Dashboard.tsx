import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  Bookmark,
  BarChart3,
  ArrowRight,
  Percent,
  Target,
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { DashboardStats } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
  trend?: string;
}) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-surface-500 font-medium">{label}</p>
          <p className="text-3xl font-bold text-surface-900 mt-1">{value}</p>
          {trend && <p className="text-xs text-surface-500 mt-1.5">{trend}</p>}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
}

function BarChartSimple({
  data,
  maxVal,
}: {
  data: { label: string; value: number }[];
  maxVal: number;
}) {
  if (maxVal === 0) maxVal = 1;
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="text-sm text-surface-600 w-28 shrink-0 text-right truncate">{item.label}</span>
          <div className="flex-1 bg-surface-100 rounded-full h-7 overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-700 flex items-center justify-end pr-2.5"
              style={{ width: `${Math.max((item.value / maxVal) * 100, item.value > 0 ? 10 : 0)}%` }}
            >
              {item.value > 0 && (
                <span className="text-xs font-semibold text-white">{item.value}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FunnelChart({ data }: { data: { stage: string; count: number }[] }) {
  const maxCount = data[0]?.count || 1;
  return (
    <div className="space-y-2.5">
      {data.map((item, index) => {
        const width = Math.max((item.count / maxCount) * 100, 12);
        return (
          <div key={item.stage} className="flex items-center gap-3">
            <span className="text-sm text-surface-600 w-24 shrink-0 text-right">
              {item.stage}
            </span>
            <div className="flex-1 flex items-center">
              <div
                className={`h-9 rounded-lg flex items-center justify-center transition-all duration-700 ${
                  index === 0
                    ? 'bg-primary-500'
                    : index === data.length - 1
                    ? 'bg-green-500'
                    : 'bg-primary-300'
                }`}
                style={{ width: `${width}%` }}
              >
                <span className="text-xs font-bold text-white">{item.count}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await api.getDashboard();
        setStats(data);
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-5 w-80 mb-8" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const hasData = stats.total_applications > 0;

  if (!hasData) {
    return (
      <div className="p-6 sm:p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-surface-900">
            {getGreeting()}, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-surface-500 mt-1">Here's what's happening with your job search today.</p>
        </div>
        <EmptyState
          icon={<BarChart3 className="w-8 h-8 text-surface-400" />}
          title="No analytics yet"
          description="Start applying to jobs and tracking your applications to see insights here. Your analytics will populate as you use CareerFlow."
          action={
            <Link to="/jobs">
              <Button>Browse Jobs</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const maxMonthly = Math.max(...stats.applications_over_time.map((m) => m.count), 1);
  const maxStatus = Math.max(...stats.applications_by_status.map((s) => s.count), 1);

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900">
          {getGreeting()}, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-surface-500 mt-1">Here's what's happening with your job search today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Briefcase}
          label="Total Applications"
          value={stats.total_applications}
          color="bg-primary-50 text-primary-600"
        />
        <StatCard
          icon={Clock}
          label="Active Applications"
          value={stats.active_applications}
          color="bg-yellow-50 text-yellow-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Interviews"
          value={stats.interviews}
          color="bg-purple-50 text-purple-600"
          trend={`${stats.interview_rate}% interview rate`}
        />
        <StatCard
          icon={CheckCircle}
          label="Offers"
          value={stats.offers}
          color="bg-green-50 text-green-600"
        />
      </div>

      {/* Insight Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <Percent className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-surface-700">Response Rate</span>
          </div>
          <p className="text-3xl font-bold text-surface-900">{stats.response_rate}%</p>
          <p className="text-xs text-surface-500 mt-1.5">
            {stats.response_rate > 30
              ? 'Great! Your applications are getting attention.'
              : 'Keep applying. Your response rate will improve.'}
          </p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
              <Target className="w-4.5 h-4.5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-surface-700">Interview Rate</span>
          </div>
          <p className="text-3xl font-bold text-surface-900">{stats.interview_rate}%</p>
          <p className="text-xs text-surface-500 mt-1.5">
            {stats.interview_rate >= 20
              ? 'Excellent interview conversion!'
              : 'Focus on tailoring your applications for better results.'}
          </p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
              <Bookmark className="w-4.5 h-4.5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-surface-700">Saved Jobs</span>
          </div>
          <p className="text-3xl font-bold text-surface-900">{stats.saved_jobs}</p>
          <Link to="/saved" className="text-xs text-primary-600 hover:text-primary-700 mt-1.5 inline-flex items-center gap-1 font-medium">
            View saved jobs <ArrowRight className="w-3 h-3" />
          </Link>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-surface-900">Applications Over Time</h2>
          </div>
          <BarChartSimple
            data={stats.applications_over_time.map((m) => ({
              label: m.month,
              value: m.count,
            }))}
            maxVal={maxMonthly}
          />
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-surface-900">Applications by Status</h2>
          </div>
          <BarChartSimple
            data={stats.applications_by_status.map((s) => ({
              label: s.status,
              value: s.count,
            }))}
            maxVal={maxStatus}
          />
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-surface-900">Application Conversion Funnel</h2>
        </div>
        <FunnelChart data={stats.conversion_funnel} />
      </Card>
    </div>
  );
}
