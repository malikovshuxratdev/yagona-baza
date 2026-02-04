import React, { useCallback } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router';
import { paths } from '@/routes';
import { useAuth } from '@/contexts/AuthContext';
import ProfileDropdown from './Profile';

const { Header } = Layout;

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const logOut = useCallback(() => {
        logout();
        navigate(paths.HOME, { replace: true });
    }, [navigate, logout]);

    return (
        <>
            <Header className="bg-white shadow-sm px-4 sm:px-6 flex justify-end border-b border-gray-light-9 sticky top-0 z-50">

                <div className="flex items-center justify-end gap-3">
                    <div className="hidden lg:block">
                        <ProfileDropdown logOut={logOut} />
                    </div>
                </div>
            </Header>

        </>
    );
};

export default Navbar;
