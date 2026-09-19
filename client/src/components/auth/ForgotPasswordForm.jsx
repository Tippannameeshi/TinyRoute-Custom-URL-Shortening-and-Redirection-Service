import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { ROUTES } from "../../constants/routes";
import { Alert } from "../common/Alert";

export const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const { data } = await authApi.forgotPassword({ email });

      setMessage(
        data.message || "Password reset link sent to your email."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send password reset request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 px-8 py-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm">
            🔒
          </div>

          <h2 className="text-3xl font-bold text-white">
            Forgot Password
          </h2>

          <p className="mt-2 text-sm text-indigo-100">
            Enter your email address and we'll send you password reset instructions.
          </p>

        </div>

        {/* Body */}

        <div className="p-8">

          <Alert
            message={error}
            onClose={() => setError(null)}
          />

          {message && (
            <Alert
              type="success"
              message={message}
              onClose={() => setMessage(null)}
            />
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-900 dark:focus:ring-indigo-900/40"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Sending Instructions..."
                : "Send Reset Link"}
            </button>

          </form>

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span className="px-4 text-xs text-slate-400">
              OR
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Remember your password?
          </p>

          <Link
            to={ROUTES.LOGIN}
            className="mt-4 flex w-full items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 py-3 font-semibold text-indigo-700 transition-all duration-300 hover:bg-indigo-100 dark:border-indigo-900 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};