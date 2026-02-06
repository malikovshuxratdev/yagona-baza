import React from 'react';
import { LevelStatisticsComponent } from './components';

const LevelDashboardPage: React.FC = () => {
    return (
        <div className="mx-auto space-y-6">
            <div className="text-center mb-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-3 sm:mb-6">
                    Daraja statistikasi
                </h2>
            </div>
            <LevelStatisticsComponent />
        </div>
    );
};

export default LevelDashboardPage;
