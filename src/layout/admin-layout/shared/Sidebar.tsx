import { Layout, Menu } from 'antd';
import {
    Users,
    BarChart,
    Building2,
    BookOpen,
    Briefcase,
    Award,
    Layers,
} from 'lucide-react';
import { LogoutOutlined } from '@ant-design/icons';
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
    const [openKeys, setOpenKeys] = useState<string[]>([
        paths.ADMIN,
        paths.REESTR_ADMIN,
        paths.INTERNSHIP_ADMIN,
        paths.ACADEMIC_ADMIN,
        paths.LEVEL_ADMIN,
    ]);
    const handleLogout = useCallback(() => {
        logout();
        navigate(paths.HOME, { replace: true });
    }, [navigate, logout]);

    const isAdminActive = location.pathname.startsWith(paths.ADMIN);
    const isReestrActive = location.pathname.startsWith(paths.REESTR_ADMIN);
    const isInternshipActive = location.pathname.startsWith(paths.INTERNSHIP_ADMIN);
    const isAcademicActive = location.pathname.startsWith(paths.ACADEMIC_ADMIN);
    const isLevelActive = location.pathname.startsWith(paths.LEVEL_ADMIN);

    const menuItems: MenuProps['items'] = useMemo(
        () =>
            [
                {
                    key: paths.ADMIN,
                    icon: <BookOpen size={18} className="shrink-0" />,
                    label: (
                        <span
                            className={`text-base font-semibold transition-colors ${isAdminActive ? 'text-blue-light' : 'text-gray-light-10'}`}
                        >
                            Science Id
                        </span>
                    ),
                    children: [
                        {
                            key: paths.DASHBOARD,
                            icon: <BarChart size={18} />,
                            label: (
                                <Link
                                    to={paths.DASHBOARD}
                                    className="text-gray-light-10 text-[15px] font-medium"
                                >
                                    Dashboard
                                </Link>
                            ),
                        },
                        {
                            key: paths.USERS,
                            icon: <Users size={18} />,
                            label: (
                                <Link
                                    to={paths.USERS}
                                    className="text-gray-light-10 text-[15px] font-medium"
                                >
                                    Foydalanuvchilar
                                </Link>
                            ),
                        },
                    ],
                },
                {
                    key: paths.REESTR_ADMIN,
                    icon: <Building2 size={18} className="shrink-0" />,
                    label: (
                        <span
                            className={`text-base font-semibold transition-colors ${isReestrActive ? 'text-blue-light' : 'text-gray-light-10'}`}
                        >
                            Reestr
                        </span>
                    ),
                    children: [
                        {
                            key: paths.REESTR_DASHBOARD,
                            icon: <BarChart size={18} />,
                            label: (
                                <Link
                                    to={paths.REESTR_DASHBOARD}
                                    className="text-gray-light-10 text-[15px] font-medium"
                                >
                                    Dashboard
                                </Link>
                            ),
                        },
                        {
                            key: paths.REESTR_ORGANIZATIONS,
                            icon: <Building2 size={18} />,
                            label: (
                                <Link
                                    to={paths.REESTR_ORGANIZATIONS}
                                    className="text-gray-light-10 text-[15px] font-medium"
                                >
                                    Tashkilotlar
                                </Link>
                            ),
                        },
                    ],
                },
                {
                    key: paths.INTERNSHIP_ADMIN,
                    icon: <Briefcase size={18} className="shrink-0" />,
                    label: (
                        <span
                            className={`text-base font-semibold transition-colors ${isInternshipActive ? 'text-blue-light' : 'text-gray-light-10'}`}
                        >
                            Internship
                        </span>
                    ),
                    children: [
                        {
                            key: paths.INTERNSHIP_DASHBOARD,
                            icon: <BarChart size={18} />,
                            label: (
                                <Link
                                    to={paths.INTERNSHIP_DASHBOARD}
                                    className="text-gray-light-10 text-[15px] font-medium"
                                >
                                    Dashboard
                                </Link>
                            ),
                        },
                        // {
                        //     key: paths.INTERNSHIP_APPLICATIONS,
                        //     icon: <Briefcase size={18} />,
                        //     label: (
                        //         <Link
                        //             to={paths.INTERNSHIP_APPLICATIONS}
                        //             className="text-gray-light-10 text-[15px] font-medium"
                        //         >
                        //             Arizalar
                        //         </Link>
                        //     ),
                        // },
                    ],
                },
                {
                    key: paths.ACADEMIC_ADMIN,
                    icon: <Award size={18} className="shrink-0" />,
                    label: (
                        <span
                            className={`text-base font-semibold transition-colors ${isAcademicActive ? 'text-blue-light' : 'text-gray-light-10'}`}
                        >
                            Akadem
                        </span>
                    ),
                    children: [
                        {
                            key: paths.ACADEMIC_DASHBOARD,
                            icon: <BarChart size={18} />,
                            label: (
                                <Link
                                    to={paths.ACADEMIC_DASHBOARD}
                                    className="text-gray-light-10 text-[15px] font-medium"
                                >
                                    Dashboard
                                </Link>
                            ),
                        },
                    ],
                },
                {
                    key: paths.LEVEL_ADMIN,
                    icon: <Layers size={18} className="shrink-0" />,
                    label: (
                        <span
                            className={`text-base font-semibold transition-colors ${isLevelActive ? 'text-blue-light' : 'text-gray-light-10'}`}
                        >
                            Daraja
                        </span>
                    ),
                    children: [
                        {
                            key: paths.LEVEL_DASHBOARD,
                            icon: <BarChart size={18} />,
                            label: (
                                <Link
                                    to={paths.LEVEL_DASHBOARD}
                                    className="text-gray-light-10 text-[15px] font-medium"
                                >
                                    Dashboard
                                </Link>
                            ),
                        },
                    ],
                },
            ].filter(Boolean) as MenuProps['items'],
        [isAdminActive, isReestrActive, isInternshipActive, isAcademicActive, isLevelActive]
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
                        inlineCollapsed={collapsed}
                        selectedKeys={[location.pathname]}
                        openKeys={openKeys}
                        onOpenChange={setOpenKeys}
                        items={menuItems}
                        className="border-0 [&_.ant-menu-item]:flex [&_.ant-menu-item]:items-center [&_.ant-menu-submenu-title]:flex [&_.ant-menu-submenu-title]:items-center"
                        style={{
                            backgroundColor: 'transparent',
                            fontSize: '15px',
                        }}
                    />
                </div>

                <div className="p-4 border-t border-gray-light">
                    <button
                        className="flex items-center gap-3 w-full px-4 py-2 text-gray-light-10 hover:text-red hover:bg-red-light-2 rounded-lg transition-colors"
                        aria-label="Chiqish"
                        onClick={handleLogout}
                    >
                        <LogoutOutlined style={{ fontSize: '18px' }} />
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
