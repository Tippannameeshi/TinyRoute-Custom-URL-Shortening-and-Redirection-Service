import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AdminLayout } from '../layouts/AdminLayout';

import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';

import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';

import { DashboardPage } from '../pages/DashboardPage';
import { UrlListPage } from '../pages/UrlListPage';
import { CreateUrlPage } from '../pages/CreateUrlPage';
import { EditUrlPage } from '../pages/EditUrlPage';
import { UrlAnalyticsPage } from '../pages/UrlAnalyticsPage';

import { ProfilePage } from '../pages/ProfilePage';
import { SettingsPage } from '../pages/SettingsPage';
import { RedirectPassThroughPage } from '../pages/RedirectPassThroughPage';

import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { AdminUsersPage } from '../pages/AdminUsersPage';
import { AdminUrlsPage } from '../pages/AdminUrlsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages Layout */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Route>

      {/* Password Protected Short Link Redirect Entry */}
      <Route path={ROUTES.REDIRECT_PASSWORD} element={<RedirectPassThroughPage />} />

      {/* Auth Pages Layout */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
      </Route>

      {/* Protected User Dashboard Layout */}
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

      {/* Admin Panel Layout */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboardPage />} />
          <Route path={ROUTES.ADMIN_USERS} element={<AdminUsersPage />} />
          <Route path={ROUTES.ADMIN_URLS} element={<AdminUrlsPage />} />
        </Route>
      </Route>

      {/* 404 Not Found */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};
