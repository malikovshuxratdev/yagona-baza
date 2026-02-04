import React from 'react';
import { useNavigate } from 'react-router';
import { HeaderTitle } from '@/components';
import { OrganizationCreateForm } from '@/components/forms';
import { paths } from '@/routes';

const OrganizationCreate: React.FC = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        navigate(paths.ORGANIZATIONS);
    };

    const handleCancel = () => {
        navigate(paths.ORGANIZATIONS);
    };

    return (
        <>
            <HeaderTitle title="Tashkilotni ro'yxatga olish" onBack={handleCancel} />
            <div className="mt-4">
                <OrganizationCreateForm
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                />
            </div>
        </>
    );
};

export default OrganizationCreate;
