import React from 'react';
import { ReestrOrgClassTable } from './components';

const ReestrDashboardPage: React.FC = () => {
    return (
        <div className="mx-auto space-y-2">
            <div className="text-center mb-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-3 sm:mb-6">
                    Reestr statistikasi
                </h2>
            </div>
            <ReestrOrgClassTable />
        </div>
    );
};

export default ReestrDashboardPage;
