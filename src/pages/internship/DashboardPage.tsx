import React from 'react';
import { InternshipStatisticsComponent, InternshipRegionComponent } from './components';

const InternshipDashboardPage: React.FC = () => {
    return (
        <div className="mx-auto space-y-2">
            <div className="text-center mb-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-3 sm:mb-6">
                    Internship statistikasi
                </h2>
            </div>
            <InternshipStatisticsComponent />
            <InternshipRegionComponent />
        </div>
    );
};

export default InternshipDashboardPage;
