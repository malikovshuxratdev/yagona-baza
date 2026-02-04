import React from 'react';
import {
    InformationRegionComponent,
    StatisticsComponent,
    UserRegisterChartComponent,
} from './components';

const DashboardPage: React.FC = () => {
    return (
        <div className="mx-auto space-y-2">
            <div className="text-center mb-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-3 sm:mb-6">
                    Science ID statistikasi
                </h2>
            </div>
            <UserRegisterChartComponent />
            <StatisticsComponent />
            <InformationRegionComponent />
        </div>
    );
};

export default DashboardPage;