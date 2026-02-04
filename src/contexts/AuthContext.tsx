import React, { createContext, useCallback, useContext, useState } from 'react';

const AUTH_KEY = 'auth_logged_in';

function getInitialLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(AUTH_KEY) === '1';
}

interface AuthContextValue {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(getInitialLoggedIn);

    const login = useCallback(() => {
        sessionStorage.setItem(AUTH_KEY, '1');
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(AUTH_KEY);
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
