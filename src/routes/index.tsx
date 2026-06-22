import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

// Pages
import LoginPage from '@/pages/auth/LoginPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ContactAdminPage from '@/pages/auth/ContactAdminPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import CoursesPage from '@/pages/courses/CoursesPage';
import CourseCategoriesPage from '@/pages/courses/CourseCategoriesPage';
import InstructorsPage from '@/pages/instructors/InstructorsPage';
import StudentsPage from '@/pages/students/StudentsPage';
import SubscriptionPage from '@/pages/subscription/SubscriptionPage';
import AnalyticsPage from '@/pages/analytics/AnalyticsPage';
import SettingsPage from '@/pages/settings/SettingsPage';
import BrandingPage from '@/pages/settings/BrandingPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: 'login',
                element: <LoginPage />,
              },
              {
                path: 'forgot-password',
                element: <ForgotPasswordPage />,
              },
              {
                path: 'contact-admin',
                element: <ContactAdminPage />,
              },
            ],
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: 'dashboard',
                element: <DashboardPage />,
              },
              {
                path: 'courses',
                element: <CoursesPage />,
              },
              {
                path: 'courses/categories',
                element: <CourseCategoriesPage />,
              },
              {
                path: 'instructors',
                element: <InstructorsPage />,
              },
              {
                path: 'students',
                element: <StudentsPage />,
              },
              {
                path: 'analytics',
                element: <AnalyticsPage />,
              },
              {
                path: 'subscription',
                element: <SubscriptionPage />,
              },
              {
                path: 'settings',
                element: <SettingsPage />,
              },
              {
                path: 'settings/branding',
                element: <BrandingPage />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);