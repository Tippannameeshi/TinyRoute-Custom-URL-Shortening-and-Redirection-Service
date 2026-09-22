import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Modal } from "../common/Modal";
import { Button } from "./Button";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to perform this action? This action cannot be undone.",
  confirmText = "Delete",
  variant = "danger",
  loading = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? undefined : onClose}
      title={title}
    >
      <div className="space-y-6">

        {/* Warning Section */}
        <div className="flex items-start gap-4">

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-rose-100
              dark:bg-rose-950/50
              border
              border-rose-200
              dark:border-rose-900
            "
          >
            <AlertTriangle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
          </div>

          <div className="flex-1">

            <h4 className="font-semibold text-slate-900 dark:text-white">
              {title}
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {message}
            </p>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-slate-200 dark:border-slate-800" />

        {/* Actions */}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            icon={X}
          >
            Cancel
          </Button>

          <Button
            variant={variant}
            onClick={onConfirm}
            isLoading={loading}
            icon={!loading ? Trash2 : null}
          >
            {loading ? "Processing..." : confirmText}
          </Button>

        </div>

      </div>
    </Modal>
  );
};