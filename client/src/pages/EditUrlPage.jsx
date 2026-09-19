import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { urlApi } from '../api/urlApi';
import { UrlForm } from '../components/url/UrlForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ROUTES } from '../constants/routes';

export const EditUrlPage = () => {
  const { id } = useParams();
  const [urlRecord, setUrlRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    urlApi
      .getUrlById(id)
      .then((res) => setUrlRecord(res.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await urlApi.updateUrl(id, formData);
      navigate(ROUTES.URL_LIST);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner size="large" />;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Edit Short URL</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Update destination, alias, or security parameters</p>
      </div>

      {urlRecord && (
        <UrlForm initialData={urlRecord} onSubmit={handleSubmit} isEditing={true} loading={submitting} />
      )}
    </div>
  );
};
