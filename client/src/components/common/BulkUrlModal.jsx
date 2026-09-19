import React, { useState } from "react";
import { Modal } from "./Modal";
import { urlApi } from "../../api/urlApi";
import { Alert } from "./Alert";
import { Button } from "../ui/Button";
import {
  Layers,
  Link2,
  FileText,
  CheckCircle2,
} from "lucide-react";

export const BulkUrlModal = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length === 0) {
      setError("Please enter at least one URL per line.");
      return;
    }

    const payload = lines.map((url) => ({
      original_url: url,
    }));

    setLoading(true);

    try {
      await urlApi.bulkCreateUrls(payload);

      setText("");

      onSuccess();

      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to bulk create URLs."
      );
    } finally {
      setLoading(false);
    }
  };

  const urlCount = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0).length;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk URL Creator"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Alert
          message={error}
          onClose={() => setError(null)}
        />

        {/* Info Card */}

        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">

          <div className="flex items-start gap-3">

            <div className="rounded-xl bg-indigo-100 p-2 dark:bg-indigo-900">
              <FileText
                size={20}
                className="text-indigo-600"
              />
            </div>

            <div>

              <h3 className="font-semibold text-indigo-700 dark:text-indigo-300">
                Batch Import
              </h3>

              <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400">
                Paste one destination URL per line. Every URL
                will automatically receive its own short link.
              </p>

            </div>

          </div>

        </div>

        {/* Textarea */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Destination URLs
            </label>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {urlCount} URL{urlCount !== 1 && "s"}
            </span>

          </div>

          <div className="relative">

            <Link2
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <textarea
              rows={8}
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
              placeholder={`https://example.com/page1
https://google.com
https://github.com
https://yourwebsite.com/blog`}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-4 pl-12 pr-4 font-mono text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-indigo-900/40"
            />

          </div>

        </div>

        {/* Tips */}

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-900/20">

          <div className="flex gap-3">

            <CheckCircle2
              size={20}
              className="mt-0.5 text-emerald-600"
            />

            <div>

              <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">
                Tips
              </h4>

              <ul className="mt-2 space-y-1 text-xs text-emerald-600 dark:text-emerald-400">
                <li>• One URL per line</li>
                <li>• Include https:// or http://</li>
                <li>• Duplicate URLs are allowed</li>
                <li>• Each URL receives a unique short code</li>
              </ul>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-700">

          <Button
            variant="ghost"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            isLoading={loading}
            icon={Layers}
          >
            Shorten {urlCount > 0 ? `${urlCount} URL${urlCount > 1 ? "s" : ""}` : "Batch"}
          </Button>

        </div>

      </form>
    </Modal>
  );
};