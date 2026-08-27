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
  Clock,
  FileText,
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Smart Job Discovery',
    description:
      'Search and filter job listings by role, location, salary, skills, and experience.',
  },
  {
    icon: LayoutDashboard,
    title: 'Application Tracking',
    description:
      'Track every application through a clear visual pipeline from applied to offer.',
  },
  {
    icon: BarChart3,
    title: 'Career Analytics',
    description:
      'Understand response rates, interview conversion, application trends, and progress.',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description:
      'Stay on top of interviews, follow-ups, deadlines, and important application updates.',
  },
  {
    icon: Bookmark,
    title: 'Job Collections',
    description:
      'Save interesting positions and organize opportunities you want to apply to later.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description:
      'Keep your job search information organized and protected in one private workspace.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Browse and search relevant job opportunities.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Apply',
    description: 'Apply to jobs and track every application.',
    icon: Target,
  },
  {
    number: '03',
    title: 'Track & Improve',
    description: 'Use analytics to understand and improve your job search.',
    icon: TrendingUp,
  },
];

const pipeline = [
  {
    stage: 'Applied',
    count: 12,
    percentage: 100,
    color: 'bg-blue-500',
    light: 'bg-blue-50',
    text: 'text-blue-600',
  },
  {
    stage: 'Screening',
    count: 8,
    percentage: 67,
    color: 'bg-yellow-500',
    light: 'bg-yellow-50',
    text: 'text-yellow-600',
  },
  {
    stage: 'Interview',
    count: 5,
    percentage: 42,
    color: 'bg-purple-500',
    light: 'bg-purple-50',
    text: 'text-purple-600',
  },
  {
    stage: 'Technical',
    count: 3,
    percentage: 25,
    color: 'bg-indigo-500',
    light: 'bg-indigo-50',
    text: 'text-indigo-600',
  },
  {
    stage: 'Offer',
    count: 1,
    percentage: 8,
    color: 'bg-green-500',
    light: 'bg-green-50',
    text: 'text-green-600',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-surface-200/60 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-sm">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900">
              CareerFlow
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              to="/jobs"
              className="text-sm font-medium text-surface-600 transition-colors hover:text-surface-900"
            >
              Jobs
            </Link>

            <a
              href="#features"
              className="text-sm font-medium text-surface-600 transition-colors hover:text-surface-900"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-surface-600 transition-colors hover:text-surface-900"
            >
              How It Works
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50 hover:text-surface-900 sm:px-4"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary-50/70 via-white to-white pb-14 pt-28 sm:pb-16 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
              <Zap className="h-4 w-4" />
              Your job search, organized for success
            </div>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-surface-900 sm:text-5xl lg:text-6xl">
              Your entire job search.
              <span className="block text-primary-600">
                One organized workspace.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-surface-600 sm:text-xl">
              Discover jobs, track applications, manage interviews, and
              understand your progress — all from one workspace.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-xl"
              >
                Explore Jobs
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-surface-300 bg-white px-7 py-3.5 font-semibold text-surface-700 transition-all hover:border-surface-400 hover:bg-surface-50"
              >
                Track Applications
              </Link>
            </div>
          </div>

          {/* Product Preview */}
          <div className="mx-auto mt-10 max-w-5xl">
            <div className="rounded-2xl border border-surface-200 bg-white p-3 shadow-2xl shadow-surface-200/50 sm:p-4">
              {/* Browser Header */}
              <div className="mb-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="flex h-7 flex-1 items-center rounded-lg bg-surface-100 px-3">
                  <span className="font-mono text-xs text-surface-400">
                    careerflow.dev/dashboard
                  </span>
                </div>
              </div>

              {/* Dashboard Mock */}
              <div className="rounded-xl bg-surface-50 p-3 sm:p-5">
                {/* Stats */}
                <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {[
                    {
                      label: 'Applications',
                      value: '24',
                      color: 'bg-primary-500',
                    },
                    {
                      label: 'Interviews',
                      value: '6',
                      color: 'bg-purple-500',
                    },
                    {
                      label: 'Offers',
                      value: '2',
                      color: 'bg-green-500',
                    },
                    {
                      label: 'Response',
                      value: '42%',
                      color: 'bg-blue-500',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-surface-100 bg-white p-3 sm:p-4"
                    >
                      <div
                        className={`mb-2.5 h-1.5 w-8 rounded-full ${item.color}`}
                      />
                      <div className="text-xl font-bold text-surface-900 sm:text-2xl">
                        {item.value}
                      </div>
                      <div className="mt-0.5 text-xs text-surface-500">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini Application Pipeline */}
                <div className="rounded-xl border border-surface-100 bg-white p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-surface-900">
                        Application Pipeline
                      </h3>
                      <p className="mt-0.5 text-[11px] text-surface-400">
                        Your application progress
                      </p>
                    </div>

                    <BarChart3 className="h-4 w-4 text-primary-500" />
                  </div>

                  <div className="space-y-3">
                    {pipeline.map((item) => (
                      <div
                        key={item.stage}
                        className="flex items-center gap-2.5"
                      >
                        <span className="w-16 shrink-0 text-[10px] font-medium text-surface-500 sm:w-20 sm:text-xs">
                          {item.stage}
                        </span>

                        <div className="h-5 flex-1 overflow-hidden rounded-full bg-surface-100">
                          <div
                            className={`flex h-full items-center justify-end rounded-full pr-2 ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          >
                            <span className="text-[9px] font-bold text-white">
                              {item.count}
                            </span>
                          </div>
                        </div>

                        <span className="w-7 text-right text-[10px] font-semibold text-surface-500">
                          {item.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">
              Features
            </p>

            <h2 className="text-3xl font-bold text-surface-900 sm:text-4xl">
              Everything you need to get hired
            </h2>

            <p className="mt-3 text-lg text-surface-600">
              A complete workspace designed to make your job search more
              organized and effective.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-surface-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-100">
                  <feature.icon className="h-5 w-5 text-primary-600" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-surface-900">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-surface-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-surface-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">
              Process
            </p>

            <h2 className="text-3xl font-bold text-surface-900 sm:text-4xl">
              How it works
            </h2>

            <p className="mt-3 text-lg text-surface-600">
              Three simple steps to organize your job search.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="h-full rounded-2xl border border-surface-200 bg-white p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-primary-50 px-2.5 py-1 text-sm font-bold text-primary-600">
                      {step.number}
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                      <step.icon className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-semibold text-surface-900">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-surface-600">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute right-[-12px] top-1/2 hidden h-0.5 w-6 bg-surface-300 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Tracking */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Text */}
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">
                Application Tracking
              </p>

              <h2 className="mb-4 text-3xl font-bold leading-tight text-surface-900 sm:text-4xl">
                Track every application.
                <span className="block text-primary-600">
                  Never lose an opportunity.
                </span>
              </h2>

              <p className="mb-6 max-w-xl text-lg leading-relaxed text-surface-600">
                CareerFlow gives you a clear view of your entire job search
                pipeline. Know exactly where every application stands and what
                needs your attention next.
              </p>

              <div className="space-y-3">
                {[
                  'Visual application pipeline',
                  'Smart interview and follow-up reminders',
                  'Analytics for response and interview rates',
                  'Secure storage for your job search',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm text-surface-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/register"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Start Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Pipeline Graph */}
            <div className="rounded-2xl border border-surface-200 bg-surface-50 p-4 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                    Pipeline
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-surface-900">
                    Applications by Stage
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <BarChart3 className="h-5 w-5 text-primary-600" />
                </div>
              </div>

              <div className="space-y-4">
                {pipeline.map((item) => (
                  <div key={item.stage}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                        />

                        <span className="text-sm font-medium text-surface-700">
                          {item.stage}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${item.light} ${item.text}`}
                        >
                          {item.count}
                        </span>

                        <span className="w-9 text-right text-xs text-surface-400">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>

                    <div className="h-3 w-full overflow-hidden rounded-full bg-surface-200">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Metrics */}
              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-surface-200 pt-5">
                <div className="rounded-xl bg-white p-3">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-lg font-bold text-surface-900">
                      42%
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-surface-500">
                    Response Rate
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3">
                  <div className="flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-purple-500" />
                    <span className="text-lg font-bold text-surface-900">
                      21%
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-surface-500">
                    Interview Rate
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-lg font-bold text-surface-900">
                      8%
                    </span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-surface-500">
                    Offer Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <section className="bg-surface-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Analytics Card */}
            <div className="order-2 rounded-2xl border border-surface-200 bg-white p-5 shadow-sm lg:order-1 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                    Analytics
                  </p>

                  <h3 className="mt-1 text-lg font-bold text-surface-900">
                    Job Search Performance
                  </h3>
                </div>

                <BarChart3 className="h-5 w-5 text-primary-600" />
              </div>

              {/* Fake chart */}
              <div className="relative h-48 rounded-xl bg-surface-50 p-4">
                <div className="absolute inset-x-4 top-5 border-t border-dashed border-surface-200" />
                <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-surface-200" />
                <div className="absolute inset-x-4 bottom-7 border-t border-dashed border-surface-200" />

                <div className="absolute inset-x-5 bottom-7 top-5 flex items-end justify-between gap-2">
                  {[
                    { month: 'Mar', value: 30 },
                    { month: 'Apr', value: 48 },
                    { month: 'May', value: 42 },
                    { month: 'Jun', value: 65 },
                    { month: 'Jul', value: 58 },
                    { month: 'Aug', value: 82 },
                  ].map((item) => (
                    <div
                      key={item.month}
                      className="flex h-full flex-1 flex-col items-center justify-end"
                    >
                      <div className="mb-1 text-[9px] font-semibold text-primary-600">
                        {item.value}
                      </div>

                      <div
                        className="w-full max-w-8 rounded-t-md bg-primary-500"
                        style={{ height: `${item.value}%` }}
                      />

                      <span className="mt-2 text-[9px] text-surface-400">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-surface-50 p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary-600" />
                    <span className="text-2xl font-bold text-surface-900">
                      24
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-surface-500">
                    Total Applications
                  </p>
                </div>

                <div className="rounded-xl bg-surface-50 p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span className="text-2xl font-bold text-surface-900">
                      6
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-surface-500">
                    Interviews
                  </p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">
                Career Analytics
              </p>

              <h2 className="mb-4 text-3xl font-bold leading-tight text-surface-900 sm:text-4xl">
                Understand what is working in your job search.
              </h2>

              <p className="mb-6 text-lg leading-relaxed text-surface-600">
                Stop guessing whether your job search is improving. CareerFlow
                turns your application activity into useful numbers and trends.
              </p>

              <div className="space-y-3">
                {[
                  'Track response and interview conversion',
                  'Monitor application activity over time',
                  'Identify where applications drop off',
                  'Make better decisions using your data',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm text-surface-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to take control of your job search?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
            Organize applications, track progress, and understand your
            performance with CareerFlow.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-primary-700 shadow-lg transition-all hover:bg-primary-50"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>

                <span className="text-xl font-bold text-white">
                  CareerFlow
                </span>
              </div>

              <p className="max-w-xs text-sm leading-relaxed text-surface-400">
                Your job search, organized for success. Discover opportunities,
                track applications, and build your career.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">
                Product
              </h3>

              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/jobs"
                    className="text-sm text-surface-400 hover:text-white"
                  >
                    Find Jobs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="text-sm text-surface-400 hover:text-white"
                  >
                    Get Started
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard"
                    className="text-sm text-surface-400 hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>

                <li>
                  <a
                    href="#features"
                    className="text-sm text-surface-400 hover:text-white"
                  >
                    Features
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-white">
                Account
              </h3>

              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/login"
                    className="text-sm text-surface-400 hover:text-white"
                  >
                    Sign In
                  </Link>
                </li>

                <li>
                  <Link
                    to="/register"
                    className="text-sm text-surface-400 hover:text-white"
                  >
                    Create Account
                  </Link>
                </li>

                <li>
                  <Link
                    to="/profile"
                    className="text-sm text-surface-400 hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-surface-800 pt-6 sm:flex-row">
            <p className="text-sm text-surface-500">
              © {new Date().getFullYear()} CareerFlow. All rights reserved.
            </p>

            <p className="text-sm text-surface-600">
              Built for modern job seekers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}