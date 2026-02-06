import { lazy, Suspense } from 'react';
import paths from '@/routes/path';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router';
import { PageLoading } from '@/components/loader';
import { RouterErrorBoundary } from '@/components/error-boundary';

// Layouts - lazy import to avoid circular dependencies
const HomeLayout = lazy(() => import('@/layout/home-layout/HomeLayout'));
const AdminLayout = lazy(() => import('@/layout/admin-layout/AdminLayout'));

// General pages
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const DashboardPage = lazy(() => import('@/pages/science-id/DashboardPage'));
const UsersPage = lazy(() => import('@/pages/science-id/UsersPage'));
const UserDetailPage = lazy(() => import('@/pages/science-id/UserDetailPage'));

// Reestr pages
const ReestrDashboardPage = lazy(() => import('@/pages/reestr/DashboardPage'));
const ReestrOrganizationsPage = lazy(() => import('@/pages/reestr/ReestrOrganizationsPage'));
const ReestrOrganizationDetail = lazy(() => import('@/pages/reestr/ReestrOrganizationDetail'));

// Internship pages
const InternshipDashboardPage = lazy(() => import('@/pages/internship/DashboardPage'));
const InternshipApplicationsPage = lazy(() => import('@/pages/internship/InternshipApplicationsPage'));
const InternshipApplicationDetail = lazy(() => import('@/pages/internship/InternshipApplicationDetail'));

// Academic mobility pages
const AcademicDashboardPage = lazy(() => import('@/pages/academic/DashboardPage'));

// Daraja pages
const LevelDashboardPage = lazy(() => import('@/pages/level/DashboardPage'));
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'));

const Router: RouteObject[] = [
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <RouterErrorBoundary />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
        ],
    },
    {
        path: paths.ADMIN,
        element: (
            <Suspense fallback={<PageLoading />}>
                <AdminLayout />
            </Suspense>
        ),
        errorElement: <RouterErrorBoundary />,
        children: [
            {
                path: paths.DASHBOARD,
                element: <DashboardPage />,
                errorElement: <RouterErrorBoundary />,
            },
            {
                path: paths.USERS,
                element: <UsersPage />,
                errorElement: <RouterErrorBoundary />,
            },
            {
                path: paths.USER_DETAIL,
                element: <UserDetailPage />,
                errorElement: <RouterErrorBoundary />,
            },
            // {
            //     path: paths.ORGANIZATIONS,
            //     element: <OrganizationsPage />,
            //     errorElement: <RouterErrorBoundary />,
            // },
            // {
            //     path: paths.ORGANIZATION_VIEW,
            //     element: <OrganizationDetail />,
            //     errorElement: <RouterErrorBoundary />,
            // },
            // {
            //     path: paths.ORGANIZATION_CREATE,
            //     element: <OrganizationCreate />,
            //     errorElement: <RouterErrorBoundary />,
            // },
        ],
    },
    {
        path: paths.REESTR_ADMIN,
        element: (
            <Suspense fallback={<PageLoading />}>
                <AdminLayout />
            </Suspense>
        ),
        errorElement: <RouterErrorBoundary />,
        children: [
            {
                path: paths.REESTR_DASHBOARD,
                element: <ReestrDashboardPage />,
                errorElement: <RouterErrorBoundary />,
            },
            {
                path: paths.REESTR_ORGANIZATIONS,
                element: <ReestrOrganizationsPage />,
                errorElement: <RouterErrorBoundary />,
            },
            {
                path: paths.REESTR_ORGANIZATION_VIEW,
                element: <ReestrOrganizationDetail />,
                errorElement: <RouterErrorBoundary />,
            },
        ],
    },
    {
        path: paths.INTERNSHIP_ADMIN,
        element: (
            <Suspense fallback={<PageLoading />}>
                <AdminLayout />
            </Suspense>
        ),
        errorElement: <RouterErrorBoundary />,
        children: [
            {
                index: true,
                element: <Navigate to={paths.INTERNSHIP_DASHBOARD} replace />,
            },
            {
                path: paths.INTERNSHIP_DASHBOARD,
                element: <InternshipDashboardPage />,
                errorElement: <RouterErrorBoundary />,
            },
            {
                path: paths.INTERNSHIP_APPLICATIONS,
                element: <InternshipApplicationsPage />,
                errorElement: <RouterErrorBoundary />,
            },
            {
                path: paths.INTERNSHIP_APPLICATION_VIEW,
                element: <InternshipApplicationDetail />,
                errorElement: <RouterErrorBoundary />,
            },
        ],
    },
    {
        path: paths.ACADEMIC_ADMIN,
        element: (
            <Suspense fallback={<PageLoading />}>
                <AdminLayout />
            </Suspense>
        ),
        errorElement: <RouterErrorBoundary />,
        children: [
            {
                index: true,
                element: <Navigate to={paths.ACADEMIC_DASHBOARD} replace />,
            },
            {
                path: paths.ACADEMIC_DASHBOARD,
                element: <AcademicDashboardPage />,
                errorElement: <RouterErrorBoundary />,
            },
        ],
    },
    {
        path: paths.LEVEL_ADMIN,
        element: (
            <Suspense fallback={<PageLoading />}>
                <AdminLayout />
            </Suspense>
        ),
        errorElement: <RouterErrorBoundary />,
        children: [
            {
                index: true,
                element: <Navigate to={paths.LEVEL_DASHBOARD} replace />,
            },
            {
                path: paths.LEVEL_DASHBOARD,
                element: <LevelDashboardPage />,
                errorElement: <RouterErrorBoundary />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(Router);

export default router;
