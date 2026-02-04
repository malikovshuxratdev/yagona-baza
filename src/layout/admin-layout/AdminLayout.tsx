import React, { useState, Suspense } from 'react';
import { Layout as AntLayout } from 'antd';
import Sidebar from './shared/Sidebar.tsx';
import Navbar from './shared/Navbar.tsx';
import { Outlet, useLocation } from 'react-router';
import { ChevronsLeftIcon } from 'lucide-react';
import { ProtectedRoute, ComponentErrorBoundary, PageLoading } from '@/components';
import { useIsMobile } from '@/hooks';

const AdminLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const isMobile = useIsMobile();
    const location = useLocation();

    const sidebarCollapsed = isMobile ? true : collapsed;

    return (
        <ProtectedRoute>
            <AntLayout className="min-h-screen">
                <Sidebar collapsed={sidebarCollapsed} />

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="fixed flex items-center justify-center w-8 h-6 cursor-pointer rounded-lg bg-gray-light hover:bg-gray-light-2 transition-all shadow-md z-[60]"
                    style={{
                        left: sidebarCollapsed ? 65 : 235,
                        top: '20px',
                        transition: 'left 0.2s',
                    }}
                >
                    <ChevronsLeftIcon
                        className={`w-[18px] h-[18px] text-dark-gray transition-transform ${sidebarCollapsed ? 'rotate-180' : ''
                            }`}
                    />
                </button>

                <AntLayout
                    style={{
                        marginLeft: sidebarCollapsed ? 80 : 250,
                        transition: 'margin-left 0.2s',
                    }}
                >
                    <Navbar />
                    <div className="p-4">
                        <div className="border border-gray-light-6 rounded-md bg-white p-4 w-full">
                            <ComponentErrorBoundary key={location.pathname} showDetails>
                                <Suspense fallback={<PageLoading />}>
                                    <Outlet />
                                </Suspense>
                            </ComponentErrorBoundary>
                        </div>
                    </div>
                </AntLayout>
            </AntLayout>
        </ProtectedRoute>
    );
};

export default AdminLayout;
