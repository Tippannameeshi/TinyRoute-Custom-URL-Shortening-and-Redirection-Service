import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, PencilLine, ShieldCheck, Globe2 } from "lucide-react";

import { urlApi } from "../api/urlApi";
import { UrlForm } from "../components/url/UrlForm";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ROUTES } from "../constants/routes";

export const EditUrlPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [urlRecord, setUrlRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* ================= Header ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <Link
            to={ROUTES.URL_LIST}
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to URL Management
          </Link>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Edit Short URL
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Update destination URL, custom alias, expiration, password
            protection and other settings.
          </p>

        </div>

        <Badge
          variant="info"
          className="px-4 py-2 font-semibold"
        >
          <PencilLine className="w-4 h-4 mr-2" />
          Editing Mode
        </Badge>

      </div>

      {/* ================= Layout ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* ================= Form ================= */}

        <div className="xl:col-span-2">

          <Card className="rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">

            <div className="border-b border-slate-200 dark:border-slate-800 px-8 py-6">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 dark:bg-indigo-900/30">

                  <PencilLine className="h-6 w-6 text-indigo-600" />

                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    URL Configuration
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Modify your URL settings and save the changes.
                  </p>

                </div>

              </div>

            </div>

            <div className="p-8">

              {urlRecord && (
                <UrlForm
                  initialData={urlRecord}
                  onSubmit={handleSubmit}
                  isEditing={true}
                  loading={submitting}
                />
              )}

            </div>

          </Card>

        </div>

        {/* ================= Sidebar ================= */}

        <div className="space-y-6">

          {/* Information */}

          <Card className="rounded-3xl">

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <ShieldCheck className="text-indigo-600 w-6 h-6" />

                <h3 className="text-lg font-bold">
                  Editing Tips
                </h3>

              </div>

              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">

                <li>• Change the destination anytime.</li>

                <li>• Update your custom short code.</li>

                <li>• Enable or disable password protection.</li>

                <li>• Configure expiration date.</li>

                <li>• Analytics remain unchanged after editing.</li>

              </ul>

            </div>

          </Card>

          {/* Preview */}

          <Card className="rounded-3xl">

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <Globe2 className="text-emerald-600 w-6 h-6" />

                <h3 className="text-lg font-bold">
                  Current URL
                </h3>

              </div>

              <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Short URL
                </p>

                <p className="mt-2 font-mono text-indigo-600 break-all">
                  {urlRecord?.short_url || "Not Available"}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-100 dark:bg-slate-800 p-5">

                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Destination
                </p>

                <p className="mt-2 text-sm break-all text-slate-700 dark:text-slate-300">
                  {urlRecord?.original_url}
                </p>

              </div>

            </div>

          </Card>

        </div>

      </div>

    </div>
  );
};