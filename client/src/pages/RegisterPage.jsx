import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Sparkles } from 'lucide-react';

export const RegisterPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

      {/* Background Effects */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[180px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

        <div className="w-full max-w-lg">

          {/* Header */}
          <div className="mb-8 text-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-indigo-300">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">
                Welcome to TinyRoute
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black text-white">
              Create Your Account
            </h1>

            <p className="mt-3 text-slate-400">
              Join thousands of users managing and tracking millions of links.
            </p>

          </div>

          {/* Register Form */}
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8">
            <RegisterForm />
          </div>

        </div>

      </div>

    </div>
  );
};