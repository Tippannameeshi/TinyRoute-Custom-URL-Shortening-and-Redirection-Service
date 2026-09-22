import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Globe, Link2, Shield, Calendar, QrCode } from "lucide-react";

import { urlApi } from "../api/urlApi";
import { ROUTES } from "../constants/routes";

import { UrlForm } from "../components/url/UrlForm";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { toast } from "../components/ui/Toast";

export const CreateUrlPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await urlApi.createUrl(formData);

      toast.success("Short URL created successfully");

      navigate(ROUTES.URL_LIST);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Create Short URL
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Create branded short links with password protection, expiration dates,
          click limits and analytics.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Form */}
        <div className="xl:col-span-2">
          <UrlForm loading={loading} onSubmit={handleSubmit} />
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Preview */}
          <Card>
            <Card.Header>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500" />
                <Card.Title className="text-base">Live Preview</Card.Title>
              </div>

              <Card.Description>
                Example of how your short URL will appear.
              </Card.Description>
            </Card.Header>

            <Card.Content>
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      My Marketing Campaign
                    </h4>

                    <p className="text-xs text-slate-500">
                      Custom branded link
                    </p>
                  </div>

                  <Badge variant="active">Preview</Badge>
                </div>

                <div className="rounded-xl bg-indigo-50 dark:bg-indigo-950/40 p-3">
                  <p className="font-mono text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    tinyroute.app/summer-sale
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Globe className="h-4 w-4" />

                  <span className="truncate">
                    https://example.com/products/summer-sale
                  </span>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Features */}
          <Card>
            <Card.Header>
              <Card.Title className="text-base">Features Included</Card.Title>
            </Card.Header>

            <Card.Content>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-100 dark:bg-indigo-950 p-2">
                    <Link2 className="h-4 w-4 text-indigo-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Custom Alias</p>

                    <p className="text-xs text-slate-500">
                      Create branded, memorable URLs.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-100 dark:bg-emerald-950 p-2">
                    <Shield className="h-4 w-4 text-emerald-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Password Protection</p>

                    <p className="text-xs text-slate-500">
                      Restrict access with secure passwords.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-orange-100 dark:bg-orange-950 p-2">
                    <Calendar className="h-4 w-4 text-orange-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Expiration Date</p>

                    <p className="text-xs text-slate-500">
                      Automatically disable expired links.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-purple-100 dark:bg-purple-950 p-2">
                    <QrCode className="h-4 w-4 text-purple-600" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Instant QR Codes</p>

                    <p className="text-xs text-slate-500">
                      Generate QR codes automatically.
                    </p>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};
