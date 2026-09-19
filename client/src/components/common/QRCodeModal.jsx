import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { urlApi } from '../../api/urlApi';
import { LoadingSpinner } from './LoadingSpinner';
import { API_BASE_URL } from '../../constants/config';
import { getStoredToken } from '../../utils/storage';
import { Button } from '../ui/Button';
import {
  Download,
  QrCode,
  Copy,
  Check
} from 'lucide-react';

export const QRCodeModal = ({ isOpen, onClose, urlRecord }) => {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen || !urlRecord) return;

    let mounted = true;

    const loadQr = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await urlApi.getQrCode(urlRecord.id);

        if (!mounted) return;

        setQrDataUrl(res.data.data.dataUrl);
        setShortUrl(res.data.data.shortUrl);
      } catch {
        if (mounted) {
          setError('Failed to load QR Code.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadQr();

    return () => {
      mounted = false;
      setQrDataUrl('');
      setShortUrl('');
    };
  }, [isOpen, urlRecord]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch {}
  };

  const downloadSvg = async () => {
    try {
      const token = getStoredToken();

      const response = await fetch(
        `${API_BASE_URL}/urls/${urlRecord.id}/qr?format=svg`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const blob = await response.blob();

      const objectUrl = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = `qr_${urlRecord.short_code}.svg`;
      a.click();

      window.URL.revokeObjectURL(objectUrl);
    } catch {
      alert('Unable to download SVG.');
    }
  };

  const downloadPng = () => {
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qr_${urlRecord.short_code}.png`;
    a.click();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="QR Code"
    >
      <div className="flex flex-col items-center space-y-5">

        {loading ? (
          <LoadingSpinner size="large" />
        ) : error ? (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl p-4 shadow border">
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="w-56 h-56"
              />
            </div>

            <div className="w-full">
              <p className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-3 rounded-lg break-all">
                {shortUrl}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full">

              <Button
                onClick={downloadPng}
                icon={Download}
              >
                PNG
              </Button>

              <Button
                variant="outline"
                onClick={downloadSvg}
                icon={QrCode}
              >
                SVG
              </Button>

              <Button
                variant="secondary"
                onClick={copyLink}
                icon={copySuccess ? Check : Copy}
              >
                {copySuccess ? 'Copied' : 'Copy'}
              </Button>

            </div>
          </>
        )}
      </div>
    </Modal>
  );
};