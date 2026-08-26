import { Link, useLocation } from 'react-router-dom';
import {
  Briefcase,
  LayoutDashboard,
  Search,
  FolderOpen,
  Bookmark,
  BarChart3,
  User,
  Bell,
  Shield,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const mainNav = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/jobs', label: 'Find Jobs', icon: Search },
  { to: '/applications', label: 'Applications', icon: FolderOpen },
  { to: '/saved', label: 'Saved Jobs', icon: Bookmark },
  { to: '/dashboard', label: 'Analytics', icon: BarChart3, hash: '#analytics' },
];

const bottomNav = [
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/notifications', label: 'Notifications', icon: Bell },
];

const adminNav = [
  { to: '/admin', label: 'Admin Panel', icon: Shield },
];

export default function Sidebar() {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (to: string) => {
    if (to === '/dashboard' && location.pathname === '/dashboard') return true;
    if (to !== '/dashboard' && location.pathname.startsWith(to)) return true;
    return false;
  };

  return (
    <aside
      className={`hidden lg:flex flex-col bg-white border-r border-surface-200 transition-all duration-300 ${
        collapsed ? 'w-[68px]' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-surface-100">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-surface-900 whitespace-nowrap">CareerFlow</span>
          )}
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {mainNav.map((item) => {
          const active = isActive(item.to) && item.label !== 'Analytics';
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-primary-600' : 'text-surface-400'}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Admin section */}
      {isAdmin && (
        <div className="px-3 py-2 border-t border-surface-100">
          {!collapsed && (
            <p className="px-3 py-1 text-[11px] font-semibold text-surface-400 uppercase tracking-wider">
              Admin
            </p>
          )}
          {adminNav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  active
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-purple-600' : 'text-surface-400'}`} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      )}

      {/* Bottom Nav */}
      <div className="px-3 py-2 border-t border-surface-100 space-y-1">
        {bottomNav.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-primary-600' : 'text-surface-400'}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-500 hover:text-surface-700 hover:bg-surface-50 transition-all duration-150 w-full"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
