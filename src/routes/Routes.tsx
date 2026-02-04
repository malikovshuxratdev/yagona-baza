import { lazy, Suspense } from 'react';
import paths from '@/routes/path';
import { createBrowserRouter, RouteObject } from 'react-router';
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
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'));
// const OrganizationsPage = lazy(() => import('@/pages/organizations/OrganizationsPage'));
// const OrganizationDetail = lazy(() => import('@/pages/organizations/OrganizationDetail'));
// const OrganizationCreate = lazy(() => import('@/pages/organizations/OrganizationCreate'));

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
        path: '*',
        element: <NotFoundPage />,
    },
];

const router = createBrowserRouter(Router);

export default router;
