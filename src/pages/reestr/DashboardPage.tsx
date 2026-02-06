import React from 'react';
import { ReestrOrgClassTable, ReestrRegionGrid } from './components';

const ReestrDashboardPage: React.FC = () => {
    return (
        <div className="mx-auto space-y-6">
            <div className="text-center mb-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-3 sm:mb-6">
                    Ilmiy va innovatsion faoliyatni yurituvchi yuridik shaxslar to'g'risida umumiy ma’lumot
                </h2>
            </div>
            <ReestrOrgClassTable />
            <ReestrRegionGrid />
        </div>
    );
};

export default ReestrDashboardPage;
