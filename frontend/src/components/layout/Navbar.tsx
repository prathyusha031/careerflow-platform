import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Briefcase,
  Menu,
  X,
  Bell,
  LogOut,
  User,
  LayoutDashboard,
  Bookmark,
  FolderOpen,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  const navLinks = user
    ? [
        { to: '/jobs', label: 'Jobs', icon: Briefcase },
        { to: '/applications', label: 'Applications', icon: FolderOpen },
        { to: '/saved', label: 'Saved', icon: Bookmark },
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ]
    : [];

  return (
    <nav className="bg-white border-b border-surface-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900">CareerFlow</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/notifications"
                  className="relative p-2 rounded-lg text-surface-500 hover:text-surface-700 hover:bg-surface-50 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-surface-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>
                  {profileOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setProfileOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-surface-200 py-1 z-50">
                        <div className="px-3 py-2 border-b border-surface-100">
                          <p className="text-sm font-medium text-surface-900">{user.name}</p>
                          <p className="text-xs text-surface-500">{user.email}</p>
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
                          onClick={() => {
                            setProfileOpen(false);
                            logout();
                          }}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-surface-700 hover:text-surface-900 rounded-lg hover:bg-surface-50 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-surface-500 hover:bg-surface-50"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  location.pathname === to
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-surface-600 hover:bg-surface-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/notifications"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50"
                >
                  <Bell className="w-4 h-4" />
                  Notifications
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-danger-600 hover:bg-danger-50 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t border-surface-100">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-center text-sm font-medium text-surface-700 hover:bg-surface-50 rounded-lg"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-center text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
