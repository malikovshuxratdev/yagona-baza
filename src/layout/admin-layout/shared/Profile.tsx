import { useState } from 'react';
import { Dropdown, Button } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import defaultUser from '@/assets/images/avatar.svg';

interface ProfileDropdownProps {
    logOut: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ logOut }) => {
    const [visible, setVisible] = useState(false);

    const handleLogoutClick = () => {
        setVisible(false);
        logOut();
    };

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        if (key === 'logout') {
            handleLogoutClick();
            return;
        }

        setVisible(false);
    };

    const menuItems: MenuProps['items'] = [
        {
            key: 'profile-header',
            type: 'group',
            label: (
                <div className="flex items-center gap-2 py-2 my-2">
                    <img
                        src={
                            defaultUser
                        }
                        alt="Profile"
                        className="w-[44px] h-[44px] rounded-full object-contain"
                    />
                    <div>
                        <div className="text-black text-sm font-medium">
                            Admin
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'logout',
            icon: <LogoutOutlined style={{ fontSize: '18px' }} />,
            label: (
                <span className="text-black text-sm font-normal my-1">
                    Logout
                </span>
            ),
        },
    ];

    return (
        <>
            <Dropdown
                menu={{ items: menuItems, onClick: handleMenuClick }}
                trigger={['click']}
                open={visible}
                onOpenChange={setVisible}
                placement="bottomRight"
            >
                <Button
                    type="text"
                    style={{
                        backgroundColor: 'transparent',
                        padding: '0px 10px',
                    }}
                    className="flex items-center text-sm font-inter text-black"
                    icon={
                        <img
                            src={
                                defaultUser
                            }
                            className="w-8 h-8 object-contain rounded-full"
                        />
                    }
                >
                    <div className="hidden md:flex flex-col items-start">
                        <span className="text-sm font-medium">
                            Admin
                        </span>
                    </div>
                    <DownOutlined style={{ fontSize: '14px' }} />
                </Button>
            </Dropdown>
        </>
    );
};

export default ProfileDropdown;
