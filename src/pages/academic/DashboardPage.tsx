import React from 'react';
import { useAcademStatsQuery } from '@/hooks';
import { PageLoading } from '@/components';
import { AcademicStatCards } from './components';

const AcademicDashboardPage: React.FC = () => {
    const { data, isLoading } = useAcademStatsQuery();

    if (isLoading) return <PageLoading />;

    return (
        <div className="mx-auto space-y-6">
            <div className="text-center mb-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 mb-3 sm:mb-6">
                    Akademik harakatchanlik dasturi haqida umumiy ma'lumot
                </h2>
            </div>

            <AcademicStatCards
                contests={data?.contests || 0}
                applications={data?.applications || 0}
                winnerApplications={data?.winner_applications || 0}
                fundingAmount={data?.funding_amount || 0}
            />
        </div>
    );
};

export default AcademicDashboardPage;
