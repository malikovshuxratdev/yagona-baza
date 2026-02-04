import { InformationRegionComponent, StatisticsComponent } from './components';
import React from 'react';

const DashboardPage: React.FC = () => {
    return (
        <div>
            <StatisticsComponent />
            <InformationRegionComponent />
        </div>
    );
};

export default DashboardPage;