import React from "react";
import { Link } from "react-router-dom";
import {
  Link2,
  ShieldCheck,
  BarChart3,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";

import { LoginForm } from "../components/auth/LoginForm";
import { ROUTES } from "../constants/routes";

export const LoginPage = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}

      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-sky-600 text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />

        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-16">

          <div className="flex items-center gap-4 mb-10">

            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">

              <Link2 className="w-8 h-8" />

            </div>

            <div>

              <h1 className="text-4xl font-black">

                TinyRoute

              </h1>

              <p className="text-indigo-100">

                Enterprise URL Platform

              </p>

            </div>

          </div>

          <h2 className="text-5xl font-black leading-tight">

            Welcome Back 👋

          </h2>

          <p className="mt-6 text-lg text-indigo-100 leading-8">

            Access your dashboard, manage your short URLs,
            analyze click performance,
            generate QR codes,
            and monitor traffic in real time.

          </p>

          <div className="mt-12 space-y-6">

            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-green-300 w-6 h-6" />
              <span>Real-Time Analytics Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
              <BarChart3 className="text-green-300 w-6 h-6" />
              <span>Advanced Click Tracking</span>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck className="text-green-300 w-6 h-6" />
              <span>Password Protected Links</span>
            </div>

            <div className="flex items-center gap-4">
              <Zap className="text-green-300 w-6 h-6" />
              <span>Lightning Fast Base62 URLs</span>
            </div>

            <div className="flex items-center gap-4">
              <Globe className="text-green-300 w-6 h-6" />
              <span>Global Visitor Analytics</span>
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 py-10">

        <div className="w-full max-w-md">

          <div className="lg:hidden text-center mb-8">

            <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-4">

              <Link2 className="text-white w-8 h-8" />

            </div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white">

              TinyRoute

            </h1>

            <p className="text-slate-500 mt-2">

              Enterprise URL Shortener

            </p>

          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8">

            <LoginForm />

          </div>

          <div className="text-center mt-8">

            <p className="text-sm text-slate-500">

              Don't have an account?{" "}

              <Link
                to={ROUTES.REGISTER}
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};