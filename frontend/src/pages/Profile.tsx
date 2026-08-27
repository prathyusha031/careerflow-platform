import { useState, useEffect } from 'react';
import { Save, Mail, Briefcase, MapPin, GraduationCap, Code2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import type { Profile as ProfileType } from '../types';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Skeleton from '../components/ui/Skeleton';

export default function ProfilePage() {
  const { user } = useAuth();
  const [, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    skills: '',
    experience: '',
    education: '',
    preferred_locations: '',
    preferred_job_types: '',
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await api.getProfile();
        setProfile(data);
        setForm({
          skills: data.skills || '',
          experience: data.experience || '',
          education: data.education || '',
          preferred_locations: data.preferred_locations || '',
          preferred_job_types: data.preferred_job_types || '',
        });
      } catch {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await api.updateProfile(form);
      setProfile(updated);
      alert('Profile updated successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Skeleton className="h-10 w-48 mb-8" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-surface-900 mb-6">Profile</h1>

      {/* User Info Card */}
      <Card className="p-6 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-primary-700">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-surface-900">{user?.name}</h2>
            <div className="flex items-center gap-1.5 text-sm text-surface-500">
              <Mail className="w-3.5 h-3.5" />
              {user?.email}
            </div>
            <p className="text-xs text-surface-400 mt-1">
              Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </Card>

      {/* Profile Form */}
      <Card className="p-6">
        <h3 className="text-base font-semibold text-surface-900 mb-5">Professional Information</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-1.5">
              <Code2 className="w-4 h-4 text-surface-400" />
              Skills
            </label>
            <textarea
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
              placeholder="React, TypeScript, Python, SQL..."
              className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-20 resize-none transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-1.5">
              <Briefcase className="w-4 h-4 text-surface-400" />
              Experience
            </label>
            <textarea
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              placeholder="Describe your work experience..."
              className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-24 resize-none transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-1.5">
              <GraduationCap className="w-4 h-4 text-surface-400" />
              Education
            </label>
            <textarea
              value={form.education}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
              placeholder="Your educational background..."
              className="w-full px-3 py-2 border border-surface-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 h-20 resize-none transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-1.5">
              <MapPin className="w-4 h-4 text-surface-400" />
              Preferred Locations
            </label>
            <Input
              value={form.preferred_locations}
              onChange={(e) => setForm({ ...form, preferred_locations: e.target.value })}
              placeholder="Hyderabad, Bangalore, Remote..."
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-surface-700 mb-1.5">
              <Briefcase className="w-4 h-4 text-surface-400" />
              Preferred Job Types
            </label>
            <Input
              value={form.preferred_job_types}
              onChange={(e) => setForm({ ...form, preferred_job_types: e.target.value })}
              placeholder="Full-time, Contract, Remote..."
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button onClick={handleSave} loading={saving}>
            <Save className="w-4 h-4 mr-1.5" />
            Save Profile
          </Button>
        </div>
      </Card>
    </div>
  );
}
