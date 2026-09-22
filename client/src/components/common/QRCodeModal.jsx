import React, { useState, useEffect, useRef } from "react";
import { Modal } from "./Modal";
import { urlApi } from "../../api/urlApi";
import { LoadingSpinner } from "./LoadingSpinner";
import { API_BASE_URL } from "../../constants/config";
import { getStoredToken } from "../../utils/storage";
import { Button } from "../ui/Button";

import {
  Download,
  QrCode,
  Copy,
  Check,
  Link2,
  Sparkles,
} from "lucide-react";

export const QRCodeModal = ({
  isOpen,
  onClose,
  urlRecord,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState("");

  const copyTimer = useRef(null);

  useEffect(() => {
    if (!isOpen || !urlRecord) return;

    let mounted = true;

    const loadQrCode = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await urlApi.getQrCode(urlRecord.id);

        if (!mounted) return;

        setQrDataUrl(response.data.data.dataUrl);
        setShortUrl(response.data.data.shortUrl);
      } catch (err) {
        console.error(err);

        if (mounted) {
          setError("Failed to load QR Code.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadQrCode();

    return () => {
      mounted = false;

      setQrDataUrl("");
      setShortUrl("");

      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }
    };
  }, [isOpen, urlRecord]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);

      setCopySuccess(true);

      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
      }

      copyTimer.current = setTimeout(() => {
        setCopySuccess(false);
      }, 1800);
    } catch (err) {
      console.error(err);
      setError("Unable to copy URL.");
    }
  };

  const downloadSvg = async () => {
    try {
      const token = getStoredToken();

      const response = await fetch(
        `${API_BASE_URL}/urls/${urlRecord.id}/qr?format=svg`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = objectUrl;
      a.download = `qr_${urlRecord.short_code}.svg`;
      a.click();

      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error(err);
      setError("Unable to download SVG.");
    }
  };

  const downloadPng = () => {
    if (!qrDataUrl) return;

    const a = document.createElement("a");

    a.href = qrDataUrl;
    a.download = `qr_${urlRecord.short_code}.png`;

    a.click();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="QR Code"
      subtitle="Download or share your shortened link"
      maxWidth="max-w-lg"
    >
      <div className="space-y-6">

        {loading ? (
          <LoadingSpinner size="large" />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/20">

            <p className="text-sm font-semibold text-red-600 dark:text-red-400">
              {error}
            </p>

          </div>
        ) : (
          <>
            {/* QR Card */}

            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-indigo-50 p-6 shadow-xl dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">

              <div className="flex justify-center">

                <div className="rounded-2xl bg-white p-5 shadow-lg">

                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      className="h-60 w-60"
                    />
                  ) : (
                    <div className="flex h-60 w-60 items-center justify-center text-center text-xs text-slate-500">
                      QR code unavailable
                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* URL */}

            <div>

              <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">

                <Link2 size={14} />

                Short URL

              </label>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">

                <p className="break-all font-mono text-sm text-slate-700 dark:text-slate-200">
                  {shortUrl}
                </p>

              </div>

            </div>

            {/* Buttons */}

            <div className="grid gap-3 sm:grid-cols-3">

              <Button
                onClick={downloadPng}
                icon={Download}
                className="justify-center"
              >
                PNG
              </Button>

              <Button
                variant="outline"
                onClick={downloadSvg}
                icon={QrCode}
                className="justify-center"
              >
                SVG
              </Button>

              <Button
                variant={copySuccess ? "success" : "secondary"}
                onClick={copyLink}
                icon={copySuccess ? Check : Copy}
                className="justify-center"
              >
                {copySuccess ? "Copied!" : "Copy"}
              </Button>

            </div>

            {/* Footer */}

            <div className="flex items-center justify-center gap-2 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-center text-xs text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/20 dark:text-indigo-300">

              <Sparkles size={14} />

              Scan this QR code from any device to instantly open your shortened URL.

            </div>
          </>
        )}

      </div>
    </Modal>
  );
};