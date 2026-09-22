import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { ForgotPasswordForm } from "../components/auth/ForgotPasswordForm";
import { Card } from "../components/ui/Card";
import { ROUTES } from "../constants/routes";

export const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center">

        {/* ================= Left Section ================= */}

        <div className="hidden lg:flex flex-col justify-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-2 w-fit mb-6">
            <ShieldCheck className="w-5 h-5" />
            <span className="font-semibold text-sm">
              Secure Account Recovery
            </span>
          </div>

          <h1 className="text-5xl font-black text-slate-900 dark:text-white leading-tight">
            Forgot your password?
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-8">
            Don't worry. Enter the email associated with your account and
            we'll send you a secure password reset link.
          </p>

          <div className="mt-10 space-y-6">

            <div className="flex items-start gap-4">

              <div className="rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 p-3">
                <Mail className="w-6 h-6 text-indigo-600" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Email Verification
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  A password reset link will be sent to your registered email.
                </p>
              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 p-3">
                <LockKeyhole className="w-6 h-6 text-emerald-600" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Secure Reset
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Your password reset link expires automatically for maximum
                  account security.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* ================= Right Card ================= */}

        <Card className="rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-8 lg:p-10">

          <Link
            to={ROUTES.LOGIN}
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>

          <div className="mb-8">

            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              Reset Password
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Enter your email address below to receive your password reset
              instructions.
            </p>

          </div>

          <ForgotPasswordForm />

        </Card>

      </div>

    </div>
  );
};