import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

import { MainLayout } from "../layouts/MainLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { AdminLayout } from "../layouts/AdminLayout";

import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";

import { LoadingSpinner } from "../components/common/LoadingSpinner";

/* ===========================
   Lazy Loaded Pages
=========================== */

// Public
const HomePage = lazy(() =>
  import("../pages/HomePage").then((m) => ({ default: m.HomePage })),
);

// Auth
const LoginPage = lazy(() =>
  import("../pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);

const RegisterPage = lazy(() =>
  import("../pages/RegisterPage").then((m) => ({ default: m.RegisterPage })),
);

const ForgotPasswordPage = lazy(() =>
  import("../pages/ForgotPasswordPage").then((m) => ({
    default: m.ForgotPasswordPage,
  })),
);

const ResetPasswordPage = lazy(() =>
  import("../pages/ResetPasswordPage").then((m) => ({
    default: m.ResetPasswordPage,
  })),
);

const VerifyEmailPage = lazy(() =>
  import("../pages/VerifyEmailPage").then((m) => ({
    default: m.VerifyEmailPage,
  })),
);

// User Dashboard
const DashboardPage = lazy(() =>
  import("../pages/DashboardPage").then((m) => ({
    default: m.DashboardPage,
  })),
);

const UrlListPage = lazy(() =>
  import("../pages/UrlListPage").then((m) => ({
    default: m.UrlListPage,
  })),
);

const CreateUrlPage = lazy(() =>
  import("../pages/CreateUrlPage").then((m) => ({
    default: m.CreateUrlPage,
  })),
);

const EditUrlPage = lazy(() =>
  import("../pages/EditUrlPage").then((m) => ({
    default: m.EditUrlPage,
  })),
);

const UrlAnalyticsPage = lazy(() =>
  import("../pages/UrlAnalyticsPage").then((m) => ({
    default: m.UrlAnalyticsPage,
  })),
);

const ProfilePage = lazy(() =>
  import("../pages/ProfilePage").then((m) => ({
    default: m.ProfilePage,
  })),
);

const SettingsPage = lazy(() =>
  import("../pages/SettingsPage").then((m) => ({
    default: m.SettingsPage,
  })),
);

const RedirectPassThroughPage = lazy(() =>
  import("../pages/RedirectPassThroughPage").then((m) => ({
    default: m.RedirectPassThroughPage,
  })),
);

// Admin
const AdminDashboardPage = lazy(() =>
  import("../pages/AdminDashboardPage").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);

const AdminUsersPage = lazy(() =>
  import("../pages/AdminUsersPage").then((m) => ({
    default: m.AdminUsersPage,
  })),
);

const AdminUrlsPage = lazy(() =>
  import("../pages/AdminUrlsPage").then((m) => ({
    default: m.AdminUrlsPage,
  })),
);

// Misc
const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then((m) => ({
    default: m.NotFoundPage,
  })),
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullPage size="large" />}>
      <Routes>
        {/* ================= Public ================= */}

        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
        </Route>

        {/* Password Protected Redirect */}

        <Route
          path={ROUTES.REDIRECT_PASSWORD}
          element={<RedirectPassThroughPage />}
        />

        {/* ================= Authentication ================= */}

        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
          <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmailPage />} />
        </Route>

        {/* ================= Protected User ================= */}

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

            <Route path={ROUTES.URL_LIST} element={<UrlListPage />} />

            <Route path={ROUTES.URL_CREATE} element={<CreateUrlPage />} />

            <Route path={ROUTES.URL_EDIT} element={<EditUrlPage />} />

            <Route path={ROUTES.URL_ANALYTICS} element={<UrlAnalyticsPage />} />

            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />

            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          </Route>
        </Route>

        {/* ================= Admin ================= */}

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path={ROUTES.ADMIN_DASHBOARD}
              element={<AdminDashboardPage />}
            />

            <Route path={ROUTES.ADMIN_USERS} element={<AdminUsersPage />} />

            <Route path={ROUTES.ADMIN_URLS} element={<AdminUrlsPage />} />
          </Route>
        </Route>

        {/* ================= Redirects ================= */}

        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />

        {/* Catch all unknown routes */}

        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
      </Routes>
    </Suspense>
  );
};
