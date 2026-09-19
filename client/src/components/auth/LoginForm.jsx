import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";
import { Alert } from "../common/Alert";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 px-8 py-8 text-white">

        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
          <ShieldCheck size={32} />
        </div>

        <h2 className="text-3xl font-extrabold">
          Welcome Back
        </h2>

        <p className="mt-2 text-sm text-indigo-100">
          Sign in to manage your shortened URLs, analytics, and account settings.
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
          className="space-y-5"
        >
          <Input
            label="Email Address"
            type="email"
            required
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@tinyroute.com"
          />

          <div>

            <div className="mb-2 flex items-center justify-between">

              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>

              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline dark:text-indigo-400"
              >
                Forgot Password?
              </Link>

            </div>

            <Input
              type="password"
              required
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

          </div>

          <Button
            type="submit"
            isLoading={loading}
            className="mt-2 w-full"
            size="lg"
            icon={ArrowRight}
          >
            Sign In
          </Button>

        </form>

        {/* Divider */}

        <div className="flex items-center">

          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

          <span className="px-4 text-xs uppercase tracking-wider text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

        </div>

        {/* Register */}

        <div className="text-center">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?
          </p>

          <Link
            to={ROUTES.REGISTER}
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 font-semibold text-indigo-700 transition-all duration-300 hover:bg-indigo-100 dark:border-indigo-900 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700"
          >
            Create Free Account
          </Link>

        </div>

      </div>

    </div>
  );
};