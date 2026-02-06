import React from 'react';
import { formatNumber } from '@/helpers';

const AcademicStatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 sm:px-8 sm:py-6 flex flex-col justify-between">
            <p className="text-gray-600 text-sm sm:text-base mb-3">{title}</p>
            <p className="text-gray-900 text-2xl sm:text-3xl font-semibold">
                {value}
            </p>
        </div>
    );
};

const AcademicDashboardPage: React.FC = () => {
    const totalCompetitions = 4;
    const totalApplications = 591;
    const totalWinnerProjects = 77;
    const totalAllocatedAmount = 5_445_353_522;

    return (
        <div className="mx-auto space-y-6">
            <div className="text-left mb-2">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    Akademik harakatchanlik
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <AcademicStatCard
                    title="O‘tkazilgan tanlovlar"
                    value={`${formatNumber(totalCompetitions)} ta`}
                />
                <AcademicStatCard
                    title="Kelib tushgan arizalar"
                    value={`${formatNumber(totalApplications)} ta`}
                />
                <AcademicStatCard
                    title="G‘olib deb topilgan loyihalar"
                    value={`${formatNumber(totalWinnerProjects)} ta`}
                />
                <AcademicStatCard
                    title="Jami ajratilgan mablag‘"
                    value={`${formatNumber(totalAllocatedAmount)} so'm`}
                />
            </div>
        </div>
    );
};

export default AcademicDashboardPage;

