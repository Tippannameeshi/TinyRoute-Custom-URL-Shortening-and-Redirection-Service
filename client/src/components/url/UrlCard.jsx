import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatNumber, truncateUrl } from '../../utils/formatters';
import { QRCodeModal } from '../common/QRCodeModal';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
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
  ExternalLink
} from 'lucide-react';

export const UrlCard = ({ urlRecord, onDelete, onToggleStatus, onToggleFavorite }) => {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(urlRecord.short_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isExpired = urlRecord.expires_at && new Date(urlRecord.expires_at) < new Date();

  return (
    <Card hover className="p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 min-w-0 space-y-2">
          {/* Header Title & Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white truncate">
              {urlRecord.title || urlRecord.short_code}
            </h4>

            <button
              onClick={() => onToggleFavorite(urlRecord.id)}
              className="text-amber-500 hover:scale-110 transition p-1"
              title="Toggle Favorite"
            >
              <Star className={`w-4 h-4 ${urlRecord.is_favorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
            </button>

            {urlRecord.password_hash && (
              <Badge variant="favorite" className="gap-1">
                <Lock className="w-3 h-3" /> Password
              </Badge>
            )}

            {isExpired ? (
              <Badge variant="expired">Expired</Badge>
            ) : !urlRecord.is_active ? (
              <Badge variant="disabled">Disabled</Badge>
            ) : (
              <Badge variant="active">Active</Badge>
            )}
          </div>

          {/* Short URL & Copy Action */}
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <a
              href={urlRecord.short_url}
              target="_blank"
              rel="noreferrer"
              className="hover:underline inline-flex items-center"
            >
              {urlRecord.short_url}
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
            </a>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center text-xs bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-semibold px-2.5 py-1 rounded-lg transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 stroke-[3]" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                </>
              )}
            </button>
          </div>

          {/* Target URL */}
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate" title={urlRecord.original_url}>
            Target: <span className="font-mono text-slate-700 dark:text-slate-300">{truncateUrl(urlRecord.original_url, 65)}</span>
          </p>

          {/* Metadata Footer */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 dark:text-slate-500 pt-1">
            <span>Created: {formatDate(urlRecord.created_at)}</span>
            <span>Clicks: <strong className="text-slate-900 dark:text-white font-bold">{formatNumber(urlRecord.click_count)}</strong></span>
            {urlRecord.max_clicks && <span>Max Limit: {formatNumber(urlRecord.max_clicks)}</span>}
          </div>
        </div>

        {/* Actions Button Group */}
        <div className="flex items-center space-x-1.5 self-start md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800/80">
          <Link
            to={`/urls/analytics/${urlRecord.id}`}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="View Analytics"
          >
            <BarChart3 className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setShowQrModal(true)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <Link
            to={`/urls/edit/${urlRecord.id}`}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title="Edit Link"
          >
            <Edit2 className="w-4 h-4" />
          </Link>

          <button
            onClick={() => onToggleStatus(urlRecord.id)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
            title={urlRecord.is_active ? 'Disable Link' : 'Enable Link'}
          >
            {urlRecord.is_active ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            onClick={() => onDelete(urlRecord.id)}
            className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition"
            title="Delete Link"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <QRCodeModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} urlRecord={urlRecord} />
    </Card>
  );
};
