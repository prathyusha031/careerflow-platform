import { useState, useEffect } from 'react';
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { api } from '../services/api';
import type { Notification } from '../types';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';

const typeIcons: Record<string, React.ElementType> = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  interview: Clock,
};

const typeColors: Record<string, string> = {
  info: 'bg-blue-50 text-blue-600',
  warning: 'bg-yellow-50 text-yellow-600',
  success: 'bg-green-50 text-green-600',
  interview: 'bg-purple-50 text-purple-600',
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getNotifications();
        setNotifications(data.notifications);
        setUnreadCount(data.unread_count);
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const markRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      // handle error
    }
  };

  const markAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch {
      // handle error
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-surface-500 mt-1">
              {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="w-4 h-4 mr-1.5" />
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon={<Bell className="w-8 h-8 text-surface-400" />}
          title="No notifications"
          description="You're all caught up! Notifications about interviews, application updates, and reminders will appear here."
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => {
            const Icon = typeIcons[notification.notification_type] || Info;
            const colorClass = typeColors[notification.notification_type] || typeColors.info;

            return (
              <div
                key={notification.id}
                className={`bg-white rounded-xl border p-4 flex items-start gap-3.5 transition-colors cursor-pointer ${
                  notification.is_read
                    ? 'border-surface-200 hover:bg-surface-50'
                    : 'border-primary-200 bg-primary-50/30 hover:bg-primary-50/50'
                }`}
                onClick={() => !notification.is_read && markRead(notification.id)}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm ${
                        notification.is_read ? 'font-medium text-surface-700' : 'font-semibold text-surface-900'
                      }`}
                    >
                      {notification.title}
                    </h3>
                    {!notification.is_read && (
                      <span className="w-2 h-2 bg-primary-500 rounded-full shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-surface-600 mt-0.5">{notification.message}</p>
                  <p className="text-xs text-surface-400 mt-1">{timeAgo(notification.created_at)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
