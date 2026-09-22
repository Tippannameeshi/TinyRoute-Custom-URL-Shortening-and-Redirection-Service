import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../constants/routes";
import { Alert } from "../common/Alert";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    acceptTerms: false,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const getPasswordStrength = (pass) => {
    let score = 0;

    if (!pass)
      return {
        score: 0,
        label: "Weak",
        color: "bg-slate-200 dark:bg-slate-800",
      };

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1)
      return {
        score: 25,
        label: "Weak",
        color: "bg-rose-500",
      };

    if (score === 2)
      return {
        score: 50,
        label: "Fair",
        color: "bg-amber-500",
      };

    if (score === 3)
      return {
        score: 75,
        label: "Good",
        color: "bg-sky-500",
      };

    return {
      score: 100,
      label: "Strong",
      color: "bg-emerald-500",
    };
  };

  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (!formData.acceptTerms) {
      setError("You must accept the Terms of Service to create an account.");
      return;
    }

    if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      setError(
        "Password must be at least 8 characters long and include an uppercase letter and a number.",
      );
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate(ROUTES.DASHBOARD);
    } catch (err) {
      const validationErrors = err.response?.data?.errors;
      const details = Array.isArray(validationErrors)
        ? validationErrors
            .map((item) => item.message)
            .filter(Boolean)
            .join(" ")
        : "";
      setError(
        details ||
          err.response?.data?.message ||
          "Registration failed. Please check your details.",
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
          <Sparkles size={30} />
        </div>

        <h2 className="text-3xl font-extrabold">Create Your Account</h2>

        <p className="mt-2 text-sm text-indigo-100">
          Start shortening URLs, managing links, and tracking analytics in one
          place.
        </p>
      </div>

      {/* Body */}

      <div className="space-y-6 p-8">
        <Alert message={error} onClose={() => setError(null)} />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="First Name"
              name="first_name"
              required
              icon={User}
              value={formData.first_name}
              onChange={handleChange}
              placeholder="John"
            />

            <Input
              label="Last Name"
              name="last_name"
              required
              icon={User}
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>

          <Input
            label="Email Address"
            type="email"
            name="email"
            required
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />

          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              required
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
            />

            {formData.password && (
              <div className="mt-3">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-500 dark:text-slate-400">
                    Password Strength
                  </span>

                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {strength.label}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                    style={{
                      width: `${strength.score}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Security Tips */}

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-900/20">
            <div className="flex items-start">
              <CheckCircle2
                size={20}
                className="mr-3 mt-0.5 text-emerald-600"
              />

              <div>
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">
                  Strong Password Tips
                </h4>

                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                  Use at least 8 characters including uppercase, lowercase,
                  numbers and special symbols.
                </p>
              </div>
            </div>
          </div>

          {/* Terms */}

          <label className="flex cursor-pointer items-start rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
            />

            <span className="ml-3 text-sm text-slate-600 dark:text-slate-400">
              I agree to the{" "}
              <span className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
                Privacy Policy
              </span>
            </span>
          </label>

          <Button
            type="submit"
            isLoading={loading}
            className="w-full"
            size="lg"
            icon={ArrowRight}
          >
            Create Free Account
          </Button>
        </form>

        {/* Divider */}

        <div className="flex items-center">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

          <span className="px-4 text-xs uppercase tracking-widest text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Login */}

        <div className="text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Already have an account?
          </p>

          <Link
            to={ROUTES.LOGIN}
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 font-semibold text-indigo-700 transition-all duration-300 hover:bg-indigo-100 dark:border-indigo-900 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
