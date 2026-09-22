import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  formatDate,
  formatNumber,
  truncateUrl,
} from '../../utils/formatters';

import { QRCodeModal } from '../common/QRCodeModal';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

import {
  Copy,
  Check,
  Star,
  BarChart3,
  QrCode,
  Edit2,
  Pause,
  Play,
  Trash2,
  Lock,
  ExternalLink,
} from 'lucide-react';

export const UrlCard = ({
  urlRecord,
  onDelete,
  onToggleStatus,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const isExpired =
    urlRecord.expires_at &&
    new Date(urlRecord.expires_at) < new Date();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(urlRecord.short_url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card
        hover
        className="overflow-hidden"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}

          <div className="flex-1 min-w-0 space-y-4">

            {/* Header */}

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="truncate text-lg font-bold text-slate-900 dark:text-white">
                {urlRecord.title || urlRecord.short_code}
              </h3>

              <button
                onClick={() => onToggleFavorite(urlRecord.id)}
                aria-label="Toggle Favorite"
                className="rounded-lg p-1 transition hover:bg-amber-100 dark:hover:bg-amber-900/40"
              >
                <Star
                  className={`h-4 w-4 transition ${
                    urlRecord.is_favorite
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-400'
                  }`}
                />
              </button>

              {urlRecord.password_hash && (
                <Badge variant="favorite" dot>
                  <Lock className="h-3 w-3" />
                  Password
                </Badge>
              )}

              {isExpired ? (
                <Badge variant="expired" dot>
                  Expired
                </Badge>
              ) : !urlRecord.is_active ? (
                <Badge variant="disabled" dot>
                  Disabled
                </Badge>
              ) : (
                <Badge variant="active" dot>
                  Active
                </Badge>
              )}
            </div>

            {/* Short URL */}

            <div className="flex flex-wrap items-center gap-2">

              <a
                href={urlRecord.short_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center font-semibold text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400"
              >
                {urlRecord.short_url}

                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </a>

              <Button
                size="xs"
                variant="subtle"
                icon={copied ? Check : Copy}
                onClick={copyToClipboard}
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>

            </div>

            {/* Target URL */}

            <div>

              <p className="text-xs uppercase tracking-wider text-slate-400">
                Destination
              </p>

              <p
                title={urlRecord.original_url}
                className="mt-1 truncate font-mono text-sm text-slate-600 dark:text-slate-300"
              >
                {truncateUrl(urlRecord.original_url, 80)}
              </p>

            </div>

            {/* Footer */}

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">

              <span>
                Created{' '}
                <strong className="text-slate-700 dark:text-slate-200">
                  {formatDate(urlRecord.created_at)}
                </strong>
              </span>

              <span>
                Clicks{' '}
                <strong className="text-slate-900 dark:text-white">
                  {formatNumber(urlRecord.click_count)}
                </strong>
              </span>

              {urlRecord.max_clicks && (
                <span>
                  Max{' '}
                  <strong className="text-slate-700 dark:text-slate-200">
                    {formatNumber(urlRecord.max_clicks)}
                  </strong>
                </span>
              )}

            </div>

          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-1 border-t pt-4 dark:border-slate-800 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">

            <Link
              to={`/urls/analytics/${urlRecord.id}`}
              aria-label="Analytics"
              className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <BarChart3 className="h-4 w-4" />
            </Link>

            <button
              onClick={() => setShowQrModal(true)}
              aria-label="QR Code"
              className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <QrCode className="h-4 w-4" />
            </button>

            <Link
              to={`/urls/edit/${urlRecord.id}`}
              aria-label="Edit"
              className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Edit2 className="h-4 w-4" />
            </Link>

            <button
              onClick={() => onToggleStatus(urlRecord.id)}
              aria-label="Toggle Status"
              className="rounded-xl p-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {urlRecord.is_active ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => onDelete(urlRecord.id)}
              aria-label="Delete"
              className="rounded-xl p-2 text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <Trash2 className="h-4 w-4" />
            </button>

          </div>

        </div>
      </Card>

      <QRCodeModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        urlRecord={urlRecord}
      />
    </>
  );
};