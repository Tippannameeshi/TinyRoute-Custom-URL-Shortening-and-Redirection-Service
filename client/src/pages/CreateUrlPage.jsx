import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlApi } from '../api/urlApi';
import { UrlForm } from '../components/url/UrlForm';
import { ROUTES } from '../constants/routes';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Sparkles, Globe, Link2 } from 'lucide-react';

export const CreateUrlPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await urlApi.createUrl(formData);
      navigate(ROUTES.URL_LIST);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Create Short URL</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Configure destination, custom alias, password protection & expiration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Container */}
        <div className="lg:col-span-2">
          <UrlForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Live Preview Card Sidebar */}
        <div className="space-y-4">
          <Card className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Live Short URL Preview</span>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">Sample Link Title</span>
                <Badge variant="active">Preview</Badge>
              </div>

              <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                http://localhost:5000/sample-code
              </p>

              <div className="flex items-center text-[11px] text-slate-400 font-mono truncate">
                <Globe className="w-3 h-3 mr-1 shrink-0" />
                <span>https://your-destination-domain.com/...</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
              <p>• Custom Aliases create clean, brandable links.</p>
              <p>• Passwords encrypt link access until verified.</p>
              <p>• Vector QR codes are generated instantly.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
