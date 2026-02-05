import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { paths } from '@/routes';
import { useAuth } from '@/contexts/AuthContext';
import { TokenService } from '@/utils/storage';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    const hasToken = !!TokenService.getToken();

    if (!isLoggedIn && !hasToken) {
        return <Navigate to={paths.HOME} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

