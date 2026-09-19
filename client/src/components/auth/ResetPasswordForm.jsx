import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { ROUTES } from "../../constants/routes";
import { Alert } from "../common/Alert";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";

export const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await authApi.resetPassword({
        token,
        newPassword,
      });

      navigate(ROUTES.LOGIN, {
        state: {
          message: "Password reset successful. Please log in.",
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. The token may have expired."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 px-8 py-8 text-center text-white">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <ShieldCheck size={30} />
          </div>

          <h2 className="text-3xl font-bold">
            Reset Password
          </h2>

          <p className="mt-2 text-sm text-indigo-100">
            Create a new secure password for your account.
          </p>

        </div>

        {/* Body */}

        <div className="space-y-6 p-8">

          <Alert
            message={error}
            onClose={() => setError(null)}
          />

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                New Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-12 pr-4 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-indigo-900/40"
                />

              </div>

            </div>

            {/* Security Tips */}

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-900/20">

              <div className="flex items-start gap-3">

                <ShieldCheck
                  size={20}
                  className="mt-0.5 text-emerald-600"
                />

                <div>

                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">
                    Password Requirements
                  </h4>

                  <ul className="mt-2 space-y-1 text-xs text-emerald-600 dark:text-emerald-400">
                    <li>• Minimum 8 characters</li>
                    <li>• At least one uppercase letter</li>
                    <li>• At least one number</li>
                    <li>• Include one special character</li>
                  </ul>

                </div>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Updating Password..."
              ) : (
                <>
                  Reset Password
                  <ArrowRight size={18} />
                </>
              )}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};