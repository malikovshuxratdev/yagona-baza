import React, { createContext, useCallback, useContext, useState } from 'react';
import { TokenService } from '@/utils/storage';

function getInitialLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!TokenService.getAccessKey();
}

interface AuthContextValue {
    isLoggedIn: boolean;
    login: (accessKey: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoggedIn);

    const login = useCallback((accessKey: string) => {
        TokenService.setAccessKey(accessKey);
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        TokenService.clearAccessKey();
        setIsLoggedIn(false);
    }, []);

    const value: AuthContextValue = { isLoggedIn, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
