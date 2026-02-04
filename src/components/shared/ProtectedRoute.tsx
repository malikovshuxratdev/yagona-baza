import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { paths } from '@/routes';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to={paths.HOME} state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;

