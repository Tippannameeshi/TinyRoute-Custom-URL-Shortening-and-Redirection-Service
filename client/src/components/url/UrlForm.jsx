import React, { useState } from 'react';
import { Alert } from '../common/Alert';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Link2, Globe, FileText, Lock, Calendar, Star, Hash } from 'lucide-react';

export const UrlForm = ({ initialData = {}, onSubmit, isEditing = false, loading = false }) => {
  const [formData, setFormData] = useState({
    original_url: initialData.original_url || '',
    custom_alias: initialData.custom_alias || '',
    title: initialData.title || '',
    description: initialData.description || '',
    max_clicks: initialData.max_clicks || '',
    password: '',
    expires_at: initialData.expires_at ? new Date(initialData.expires_at).toISOString().slice(0, 16) : '',
    is_favorite: initialData.is_favorite || false
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = Object.fromEntries(
        Object.entries(formData).filter(
          ([key, value]) => value !== '' || key === 'is_favorite',
        ),
      );
      await onSubmit(payload);
    } catch (err) {
      const validationErrors = err.response?.data?.errors;
      const details = Array.isArray(validationErrors)
        ? validationErrors.map((item) => item.message).filter(Boolean).join(' ')
        : '';
      setError(details || err.response?.data?.message || 'Failed to save URL.');
    }
  };

  return (
    <Card className="space-y-5">
      <Alert message={error} onClose={() => setError(null)} />

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Destination URL *"
          name="original_url"
          type="url"
          required
          icon={Globe}
          value={formData.original_url}
          onChange={handleChange}
          placeholder="https://example.com/my-long-link-campaign"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Custom Alias (Optional)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-mono">
                tiny.route/
              </span>
              <input
                type="text"
                name="custom_alias"
                value={formData.custom_alias}
                onChange={handleChange}
                placeholder="my-custom-alias"
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-r-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <Input
            label="Title (Optional)"
            name="title"
            icon={FileText}
            value={formData.title}
            onChange={handleChange}
            placeholder="Spring Marketing Campaign"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Description Notes (Optional)
          </label>
          <textarea
            name="description"
            rows={2}
            value={formData.description}
            onChange={handleChange}
            placeholder="Internal campaign description or team notes..."
            className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <Input
            label="Max Click Limit"
            name="max_clicks"
            type="number"
            min="1"
            icon={Hash}
            value={formData.max_clicks}
            onChange={handleChange}
            placeholder="e.g. 500"
          />

          <Input
            label="Password Protection"
            name="password"
            type="password"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            placeholder={isEditing ? 'Unchanged' : 'Optional password'}
          />

          <Input
            label="Expiration Date"
            name="expires_at"
            type="datetime-local"
            icon={Calendar}
            value={formData.expires_at}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center pt-2">
          <input
            type="checkbox"
            id="is_favorite"
            name="is_favorite"
            checked={formData.is_favorite}
            onChange={handleChange}
            className="w-4 h-4 text-indigo-600 rounded-xs border-slate-300 focus:ring-indigo-500"
          />
          <label htmlFor="is_favorite" className="ml-2 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center">
            <Star className="w-3.5 h-3.5 mr-1.5 text-amber-500 fill-amber-400" />
            Mark as Favorite Link
          </label>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <Button type="submit" isLoading={loading} size="md" icon={Link2}>
            {isEditing ? 'Update Short URL' : 'Create Short URL'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
