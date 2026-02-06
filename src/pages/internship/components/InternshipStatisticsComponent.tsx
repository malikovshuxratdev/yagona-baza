import React, { useMemo } from 'react';
import InternshipStatCards, { type InternshipDashboardStats } from './InternshipStatCards';
import InternshipApplicationsDonutChart, { type InternshipChartSegment } from './InternshipApplicationsDonutChart';
import { useInternshipStatsQuery } from '@/hooks';
import { PageLoading } from '@/components';
import type { InternshipStatisticsResponse } from '@/types';

const CHART_COLORS = {
    completed: '#22C55E',
    inProgress: '#16a34a',
    rejected: '#EF4444',
    meg1: '#EAB308',
    meg2: '#3B82F6',
};

function mapApiStatsToDashboardStats(data: InternshipStatisticsResponse): InternshipDashboardStats {
    return {
        totalSelections: data.contest_count,
        totalApplications: data.count,
        meg1Passed: data.meg1,
        meg2Passed: data.meg2,
        rejected: data.rejected,
        inProgress: data.in_process,
        completed: data.completed,
    };
}

const InternshipStatisticsComponent: React.FC = () => {
    const { data, isPending, isError } = useInternshipStatsQuery();

    const stats: InternshipDashboardStats | null = useMemo(
        () => (data ? mapApiStatsToDashboardStats(data) : null),
        [data]
    );

    const chartSegments: InternshipChartSegment[] = useMemo(() => {
        if (!stats) return [];
        return [
            { name: "Yakunlangan arizalar soni", value: stats.completed, color: CHART_COLORS.completed },
            { name: "Jarayondagi arizalar soni", value: stats.inProgress, color: CHART_COLORS.inProgress },
            { name: "Rad etilgan arizalar soni", value: stats.rejected, color: CHART_COLORS.rejected },
            { name: "MEG 1-bosqichdan o'tgan arizalar soni", value: stats.meg1Passed, color: CHART_COLORS.meg1 },
            { name: "MEG 2-bosqichdan o'tgan arizalar soni", value: stats.meg2Passed, color: CHART_COLORS.meg2 },
        ];
    }, [stats]);

    if (isPending) return <PageLoading />;
    if (isError) {
        return (
            <div className="flex flex-col lg:flex-row gap-6 mt-6 text-gray-600">
                Statistikani yuklashda xatolik yuz berdi.
            </div>
        );
    }
    if (!stats) return <PageLoading />;

    return (
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
            <div className="w-full lg:w-1/2">
                <InternshipStatCards stats={stats} />
            </div>
            <div className="w-full lg:w-1/2 flex items-stretch">
                <InternshipApplicationsDonutChart
                    totalLabel="Jami arizalar"
                    totalValue={stats.totalApplications}
                    segments={chartSegments}
                />
            </div>
        </div>
    );
};

export default InternshipStatisticsComponent;
