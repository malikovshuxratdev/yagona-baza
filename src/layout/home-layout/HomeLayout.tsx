import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router';

const HomeLayout: React.FC = () => {
    return (
        <Layout className="min-h-screen bg-[#F1F5F9]">
            <Outlet />
        </Layout>
    );
};

export default HomeLayout;
