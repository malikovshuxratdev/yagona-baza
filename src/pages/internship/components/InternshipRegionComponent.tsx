import React, { useMemo, useState } from 'react';
import { MapContainer, PageLoading } from '@/components';
import { useInternshipRegionListQuery } from '@/hooks';
import {
    RegionSoato,
    getRegionNameUz,
    getSoatoByRegionCode,
    type RegionCode,
} from '@/constants';
import type { InternshipStatisticsResponse } from '@/types';

type InternshipRegionMetrics = {
    totalApplications: number;
    inProgress: number;
    rejected: number;
    completed: number;
    meg1Passed: number;
    meg2Passed: number;
};

const DEFAULT_REGION_METRICS: InternshipRegionMetrics = {
    totalApplications: 0,
    inProgress: 0,
    rejected: 0,
    completed: 0,
    meg1Passed: 0,
    meg2Passed: 0,
};

function mapApiStatsToRegionMetrics(data: InternshipStatisticsResponse): InternshipRegionMetrics {
    return {
        totalApplications: data.count,
        inProgress: data.in_process,
        rejected: data.rejected,
        completed: data.completed,
        meg1Passed: data.meg1,
        meg2Passed: data.meg2,
    };
}

const StatCard: React.FC<{ title: string; value: string | number }> = ({
    title,
    value,
}) => (
    <div className="border border-gray-200 bg-white rounded-lg p-4 sm:p-6 flex items-center justify-between">
        <h3 className="text-gray-600 text-[14px] sm:text-[16px]">{title}</h3>
        <p className="text-gray-900 text-[18px] sm:text-[20px] font-medium">
            {value}
        </p>
    </div>
);

const InternshipRegionComponent: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState<RegionCode>('TN');

    const soato = useMemo(
        () => getSoatoByRegionCode(selectedRegion) ?? RegionSoato.TN,
        [selectedRegion]
    );

    const { data, isPending, isError } = useInternshipRegionListQuery(soato);

    const regionName = useMemo(
        () => getRegionNameUz(selectedRegion),
        [selectedRegion]
    );

    const metrics = useMemo((): InternshipRegionMetrics => {
        if (data && typeof data === 'object' && 'count' in data) {
            return mapApiStatsToRegionMetrics(data as InternshipStatisticsResponse);
        }
        return DEFAULT_REGION_METRICS;
    }, [data]);

    const regionStats = useMemo(
        () => [
            { label: "Kelib tushgan arizalar soni", value: metrics.totalApplications },
            { label: "Jarayondagi arizalar soni", value: metrics.inProgress },
            { label: "Rad etilgan arizalar soni", value: metrics.rejected },
            { label: "Yakunlangan arizalar soni", value: metrics.completed },
            { label: "MEG 1-bosqichdan o'tgan arizalar soni", value: metrics.meg1Passed },
            { label: "MEG 2-bosqichdan o'tgan arizalar soni", value: metrics.meg2Passed },
        ],
        [metrics]
    );

    return (
        <div className="mt-10">
            <div className="text-center mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900">
                    Hududlar bo'yicha
                </h2>
            </div>

            <div className="w-full">
                <div className="w-full bg-gray-50 rounded-2xl shadow-sm p-6">
                    <div className="px-2 sm:px-4 py-2 sm:py-3">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                            {regionName}
                        </h3>
                    </div>
                    <MapContainer
                        mapId="internship-uzbekistan-map"
                        onSelectedRegion={(code) => setSelectedRegion(code as RegionCode)}
                        selectedRegion={selectedRegion}
                    />
                    {isPending ? (
                        <PageLoading />
                    ) : isError ? (
                        <div className="mt-4 text-gray-600 text-sm">
                            Hudud bo'yicha statistikani yuklashda xatolik.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                            {regionStats.map((stat) => (
                                <StatCard
                                    key={stat.label}
                                    title={stat.label}
                                    value={stat.value}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InternshipRegionComponent;
