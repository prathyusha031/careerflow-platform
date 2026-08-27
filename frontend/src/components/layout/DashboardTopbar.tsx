import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, LogOut, User, Shield, Menu, X, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const mobileNav = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/jobs', label: 'Find Jobs' },
  { to: '/applications', label: 'Applications' },
  { to: '/saved', label: 'Saved Jobs' },
  { to: '/profile', label: 'Profile' },
  { to: '/notifications', label: 'Notifications' },
];

export default function DashboardTopbar() {
  const { user, logout, isAdmin } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="h-16 bg-white border-b border-surface-200/80 flex items-center justify-between px-4 sm:px-6 shrink-0">
      {/* Mobile menu */}
      <div className="lg:hidden flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-surface-500 hover:bg-surface-50"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-surface-900">CareerFlow</span>
        </Link>
      </div>

      {/* Desktop greeting */}
      <div className="hidden lg:block">
        <h1 className="text-base font-semibold text-surface-900">
          {getGreeting()}, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-xs text-surface-500">Here's what's happening with your job search today.</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <Link
          to="/notifications"
          className="relative p-2 rounded-lg text-surface-500 hover:text-surface-700 hover:bg-surface-50 transition-colors"
        >
          <Bell className="w-5 h-5" />
        </Link>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-50 transition-colors"
          >
            <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </button>
          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-surface-200 py-1 z-50">
                <div className="px-3 py-2 border-b border-surface-100">
                  <p className="text-sm font-medium text-surface-900">{user?.name}</p>
                  <p className="text-xs text-surface-500">{user?.email}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-surface-50"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-surface-50"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => { setProfileOpen(false); logout(); }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-surface-200 z-50 lg:hidden">
            <div className="h-16 flex items-center px-4 border-b border-surface-100">
              <Link to="/dashboard" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-surface-900">CareerFlow</span>
              </Link>
            </div>
            <nav className="px-3 py-4 space-y-1">
              {mobileNav.map((item) => {
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                      active
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-surface-600 hover:bg-surface-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50"
                >
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
