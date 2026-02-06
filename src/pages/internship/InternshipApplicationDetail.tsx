import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { HeaderTitle } from '@/components';
import { paths } from '@/routes';

const InternshipApplicationDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const handleBack = () => {
        navigate(paths.INTERNSHIP_APPLICATIONS);
    };

    return (
        <div className="space-y-6">
            <HeaderTitle
                title={id ? `Ariza #${id}` : 'Ariza'}
                onBack={handleBack}
            />
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="px-4 py-6">
                    <p className="text-gray-600">
                        Ariza batafsil ma’lumotlari shu yerda ko‘rsatiladi. API ulanganidan keyin ma’lumotlar yuklanadi.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InternshipApplicationDetail;
