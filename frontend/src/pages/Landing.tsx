import { Link } from 'react-router-dom';
import {
  Briefcase,
  Search,
  BarChart3,
  Bell,
  Shield,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  Bookmark,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Smart Job Discovery',
    description: 'Search and filter across job listings by role, location, salary, skills, and experience level.',
  },
  {
    icon: LayoutDashboard,
    title: 'Application Tracking',
    description: 'Track every application through a visual Kanban board from applied to offer.',
  },
  {
    icon: BarChart3,
    title: 'Career Analytics',
    description: 'Understand your job search with insights on response rates, conversion funnels, and trends.',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Never miss a follow-up or interview with intelligent notification reminders.',
  },
  {
    icon: Bookmark,
    title: 'Job Collections',
    description: 'Save interesting positions and organize your shortlist for easy access.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and protected. Only you can see your applications.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Browse and search curated job listings from top companies.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Apply',
    description: 'Apply to positions and save interesting opportunities for later.',
    icon: Target,
  },
  {
    number: '03',
    title: 'Track & Improve',
    description: 'Follow your progress, prepare for interviews, and optimize with analytics.',
    icon: TrendingUp,
  },
];

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-surface-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-surface-900">CareerFlow</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/jobs" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">Jobs</Link>
              <a href="#features" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">How It Works</a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-surface-700 hover:text-surface-900 rounded-lg hover:bg-surface-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 bg-gradient-to-b from-primary-50/60 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6 border border-primary-100">
              <Zap className="w-4 h-4" />
              Your job search, organized for success
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-900 leading-[1.1] tracking-tight">
              Your entire job search.{' '}
              <span className="text-primary-600">One organized workspace.</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-surface-600 max-w-2xl mx-auto leading-relaxed">
              Discover jobs, track applications, manage interviews, and understand your
              progress — all from one workspace.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30"
              >
                Explore Jobs
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-surface-700 font-semibold rounded-xl border border-surface-300 hover:border-surface-400 hover:bg-surface-50 transition-all"
              >
                Track Applications
              </Link>
            </div>
          </div>

          {/* Product Preview */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-surface-200 shadow-2xl shadow-surface-200/40 p-3 sm:p-5">
              {/* Mock browser chrome */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-surface-100 rounded-lg h-7 flex items-center px-3">
                  <span className="text-xs text-surface-400 font-mono">careerflow.dev/dashboard</span>
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="bg-surface-50 rounded-xl p-4 sm:p-6">
                {/* Summary cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Applications', value: '24', color: 'bg-primary-500' },
                    { label: 'Interviews', value: '6', color: 'bg-purple-500' },
                    { label: 'Offers', value: '2', color: 'bg-green-500' },
                    { label: 'Response', value: '42%', color: 'bg-blue-500' },
                  ].map((m) => (
                    <div key={m.label} className="bg-white rounded-xl p-4 border border-surface-100">
                      <div className={`w-8 h-1.5 rounded-full ${m.color} mb-3`} />
                      <div className="text-2xl font-bold text-surface-900">{m.value}</div>
                      <div className="text-xs text-surface-500 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
                {/* Kanban mock */}
                <div className="grid grid-cols-5 gap-2 hidden sm:grid">
                  {['Applied', 'Screening', 'Interview', 'Technical', 'Offer'].map((stage) => (
                    <div key={stage} className="bg-white rounded-xl p-3 border border-surface-100">
                      <div className="text-[10px] font-semibold text-surface-500 uppercase tracking-wider mb-2">{stage}</div>
                      <div className="space-y-1.5">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-7 bg-surface-100 rounded-md" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">
              Everything you need to get hired
            </h2>
            <p className="mt-4 text-lg text-surface-600">
              A complete platform designed to make your job search more effective and organized.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-surface-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                  <feature.icon className="w-5.5 h-5.5 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">
              How it works
            </h2>
            <p className="mt-4 text-lg text-surface-600">
              Three simple steps to transform your job search.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="bg-white rounded-2xl border border-surface-200 p-7 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-sm font-bold text-primary-600 bg-primary-50 rounded-lg px-2.5 py-1">{step.number}</div>
                    <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-surface-900 mb-2">{step.title}</h3>
                  <p className="text-surface-600 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-surface-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Tracking Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Application Tracking</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-5">
                Track every application, never miss an opportunity
              </h2>
              <p className="text-lg text-surface-600 mb-7 leading-relaxed">
                CareerFlow gives you a clear view of your entire job search pipeline.
                See where every application stands, when to follow up, and which opportunities to prioritize.
              </p>
              <div className="space-y-3">
                {[
                  'Visual Kanban board for application tracking',
                  'Smart notifications for follow-ups and interviews',
                  'Analytics dashboard with actionable insights',
                  'Secure storage for all your job search data',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-surface-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
              >
                Start Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Kanban preview */}
            <div className="bg-surface-50 rounded-2xl border border-surface-200 p-5">
              <div className="grid grid-cols-5 gap-2">
                {[
                  { stage: 'Applied', count: 2, color: 'bg-blue-500' },
                  { stage: 'Screening', count: 2, color: 'bg-yellow-500' },
                  { stage: 'Interview', count: 1, color: 'bg-purple-500' },
                  { stage: 'Technical', count: 1, color: 'bg-indigo-500' },
                  { stage: 'Offer', count: 1, color: 'bg-green-500' },
                ].map((col) => (
                  <div key={col.stage}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className={`w-2 h-2 rounded-full ${col.color}`} />
                      <span className="text-[10px] font-semibold text-surface-500 uppercase tracking-wide">{col.stage}</span>
                    </div>
                    <div className="space-y-1.5">
                      {Array.from({ length: col.count }).map((_, i) => (
                        <div key={i} className="bg-white rounded-lg border border-surface-100 p-2">
                          <div className="h-1.5 bg-surface-100 rounded w-3/4 mb-1.5" />
                          <div className="h-1.5 bg-surface-100 rounded w-1/2" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-2xl border border-surface-200 p-6">
                <h3 className="text-sm font-semibold text-surface-700 mb-5">Applications by Stage</h3>
                <div className="space-y-3">
                  {[
                    { stage: 'Applied', count: 12, pct: 100, color: 'bg-blue-500' },
                    { stage: 'Screening', count: 8, pct: 67, color: 'bg-yellow-500' },
                    { stage: 'Interview', count: 5, pct: 42, color: 'bg-purple-500' },
                    { stage: 'Technical', count: 3, pct: 25, color: 'bg-indigo-500' },
                    { stage: 'Offer', count: 1, pct: 8, color: 'bg-green-500' },
                  ].map((item) => (
                    <div key={item.stage} className="flex items-center gap-3">
                      <span className="text-xs text-surface-600 w-20 text-right">{item.stage}</span>
                      <div className="flex-1 bg-surface-100 rounded-full h-6 overflow-hidden">
                        <div
                          className={`h-full rounded-full flex items-center justify-end pr-2 ${item.color}`}
                          style={{ width: `${item.pct}%` }}
                        >
                          <span className="text-[10px] font-semibold text-white">{item.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-surface-100">
                  <div>
                    <div className="text-xl font-bold text-surface-900">42%</div>
                    <div className="text-xs text-surface-500">Response Rate</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-surface-900">21%</div>
                    <div className="text-xs text-surface-500">Interview Rate</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-surface-900">8%</div>
                    <div className="text-xs text-surface-500">Offer Rate</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Analytics</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-5">
                Understand your job search
              </h2>
              <p className="text-lg text-surface-600 mb-6 leading-relaxed">
                Get insights that help you improve your approach. See your response rate,
                interview conversion, and track which strategies work best.
              </p>
              <div className="space-y-3">
                {[
                  'Response rate and interview conversion tracking',
                  'Application pipeline visualization',
                  'Trend analysis over time',
                  'Actionable recommendations',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-surface-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to take control of your career?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Organize your job search, track every application, and land your dream job with CareerFlow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all shadow-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl border border-white/30 hover:bg-white/10 transition-all"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CareerFlow</span>
              </div>
              <p className="text-sm text-surface-400 leading-relaxed max-w-xs">
                Your job search, organized for success. Discover opportunities, track applications, and build your career.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2.5">
                <li><Link to="/jobs" className="text-sm text-surface-400 hover:text-white transition-colors">Find Jobs</Link></li>
                <li><Link to="/register" className="text-sm text-surface-400 hover:text-white transition-colors">Get Started</Link></li>
                <li><Link to="/dashboard" className="text-sm text-surface-400 hover:text-white transition-colors">Dashboard</Link></li>
                <li><a href="#features" className="text-sm text-surface-400 hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Account</h3>
              <ul className="space-y-2.5">
                <li><Link to="/login" className="text-sm text-surface-400 hover:text-white transition-colors">Sign In</Link></li>
                <li><Link to="/register" className="text-sm text-surface-400 hover:text-white transition-colors">Create Account</Link></li>
                <li><Link to="/profile" className="text-sm text-surface-400 hover:text-white transition-colors">Profile</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-surface-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-500">
              &copy; {new Date().getFullYear()} CareerFlow. All rights reserved.
            </p>
            <p className="text-sm text-surface-600">
              Built with care for job seekers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
