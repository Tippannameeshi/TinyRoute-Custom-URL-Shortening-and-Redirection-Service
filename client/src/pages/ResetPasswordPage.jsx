import React from 'react';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';
import { ShieldCheck, KeyRound } from 'lucide-react';

export const ResetPasswordPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

      {/* Background Blur Effects */}
      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-500/20 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[180px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">

        <div className="w-full max-w-lg">

          {/* Header */}
          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 shadow-xl shadow-indigo-500/30">

              <KeyRound className="h-10 w-10 text-white" />

            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-indigo-300">

              <ShieldCheck className="h-4 w-4" />

              <span className="text-sm font-semibold">
                Secure Password Reset
              </span>

            </div>

            <h1 className="mt-6 text-4xl font-black text-white">
              Reset Your Password
            </h1>

            <p className="mt-3 text-slate-400 leading-relaxed">
              Create a new strong password to regain secure access to your
              TinyRoute account.
            </p>

          </div>

          {/* Form */}
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8">

            <ResetPasswordForm />

          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Use a password with at least{" "}
            <span className="font-semibold text-indigo-300">
              8 characters
            </span>
            , including uppercase letters, numbers, and special characters.
          </p>

        </div>

      </div>
    </div>
  );
};