import { Layout, Menu } from 'antd';
import {
    LogOut,
    Users,
    BarChart,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useMemo, useCallback } from 'react';
import { paths } from '@/routes';
import { useAuth } from '@/contexts/AuthContext';
import type { MenuProps } from 'antd';
import logoImg from '@/assets/icons/logo.svg';
import miniLogoImg from '@/assets/icons/miniLogo.svg';

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [openKeys, setOpenKeys] = useState<string[]>([paths.ADMIN]);



    const handleLogout = useCallback(() => {
        logout();
        navigate(paths.HOME, { replace: true });
    }, [navigate, logout]);

    const menuItems: MenuProps['items'] = useMemo(
        () =>
            [
                {
                    key: paths.ADMIN,
                    label: 'Science Id',
                    children: [
                        {
                            key: paths.DASHBOARD,
                            icon: <BarChart size={16} />,
                            label: (
                                <Link
                                    to={paths.DASHBOARD}
                                    className="text-gray-light-10"
                                >
                                    Dashboard
                                </Link>
                            ),
                        },
                        {
                            key: paths.USERS,
                            icon: <Users size={16} />,
                            label: (
                                <Link
                                    to={paths.USERS}
                                    className="text-gray-light-10"
                                >
                                    Foydalanuvchilar
                                </Link>
                            ),
                        },
                    ],
                },
            ].filter(Boolean) as MenuProps['items'],
        []
    );

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="bg-white border-r border-gray-light"
            width={250}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}
        >
            <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-light flex items-center justify-center min-h-[72px]">
                    <Link
                        to={paths.DASHBOARD}
                        className="flex items-center gap-2 justify-center"
                        aria-label="Yagona baza"
                    >
                        {collapsed ? (
                            <img src={miniLogoImg} alt="Yagona baza" className="h-8 w-auto" />
                        ) : (
                            <img src={logoImg} alt="Yagona baza" className="h-8 w-auto max-w-[180px]" />
                        )}
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                    <Menu
                        mode="inline"
                        selectedKeys={[location.pathname]}
                        openKeys={openKeys}
                        onOpenChange={setOpenKeys}
                        items={menuItems}
                        className="border-0"
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: '14px',
                        }}
                    />
                </div>

                <div className="p-4 border-t border-gray-light">
                    <button
                        className="flex items-center gap-3 w-full px-4 py-2 text-gray-light-10 hover:text-red hover:bg-red-light-2 rounded-lg transition-colors"
                        aria-label="Chiqish"
                        onClick={handleLogout}
                    >
                        <LogOut size={18} />
                        {!collapsed && (
                            <span className="text-sm">
                                Chiqish
                            </span>
                        )}
                    </button>
                </div>
            </div>

        </Sider>
    );
};

export default Sidebar;
