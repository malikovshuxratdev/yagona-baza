import React from 'react';
import { useParams } from 'react-router-dom';

const ReestrOrganizationDetail: React.FC = () => {
    const { tin } = useParams<{ tin: string }>();

    return (
        <div>
            <h2 className="text-lg font-medium text-gray-900">
                Reestr – Tashkilot batafsil (TIN: {tin})
            </h2>
        </div>
    );
};

export default ReestrOrganizationDetail;
