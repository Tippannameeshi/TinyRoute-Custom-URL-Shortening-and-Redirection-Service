import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { urlApi } from "../api/urlApi";
import { Alert } from "../components/common/Alert";
import {
  Lock,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Link2,
} from "lucide-react";

export const RedirectPassThroughPage = () => {
  const { shortCode } = useParams();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const { data } = await urlApi.verifyPassword(shortCode, password);

      window.location.href = data.data.original_url;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Incorrect password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">

      {/* Background Blur */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-sky-500/20 blur-[120px]" />

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-sky-500 p-8 text-center">

            <div className="mx-auto w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">

              <Lock className="w-10 h-10 text-white" />

            </div>

            <h1 className="mt-6 text-3xl font-black text-white">
              Protected Link
            </h1>

            <p className="mt-2 text-indigo-100 text-sm">
              Enter the password to continue
            </p>
          </div>

          {/* Body */}
          <div className="p-8 space-y-6">

            <div className="rounded-2xl bg-slate-800/40 border border-slate-700 p-4">

              <div className="flex items-center gap-3">

                <Link2 className="w-5 h-5 text-indigo-400" />

                <div>

                  <p className="text-xs text-slate-400 uppercase tracking-wider">
                    Short Code
                  </p>

                  <p className="font-mono text-indigo-300 font-bold">
                    {shortCode}
                  </p>

                </div>

              </div>

            </div>

            <Alert
              message={error}
              onClose={() => setError(null)}
            />

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>

                <label className="block mb-2 text-sm font-semibold text-slate-300">

                  Password

                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 pr-12 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full rounded-xl bg-gradient-to-r from-indigo-600 to-sky-500 py-3 font-bold text-white transition hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">

                    <Loader2 className="w-5 h-5 animate-spin" />

                    Verifying...

                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">

                    <ShieldCheck className="w-5 h-5" />

                    Unlock Link

                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />

                  </span>
                )}
              </button>
            </form>

            <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4">

              <p className="text-xs text-indigo-200 leading-relaxed text-center">

                This destination is password protected by its owner.
                After verification you'll be redirected automatically.

              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};