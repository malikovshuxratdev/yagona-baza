import React, { useState, useMemo } from 'react';
import { MapContainer, PageLoading } from '@/components';
import { useLevelRegionStatisticsQuery } from '@/hooks';
import { REGION_NAMES_UZ } from '@/constants/regionSoato';
import type { LevelRegionStatisticsItem } from '@/types';
import { formatNumber } from '@/helpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3">
        <span className="text-sm text-gray-600">{title}</span>
        <span className="font-semibold text-gray-900">{value}</span>
    </div>
);

const LevelRegionGrid: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState<string>('TN');
    const { data: apiData, isLoading } = useLevelRegionStatisticsQuery();

    const regionByName = useMemo(() => {
        const map = new Map<string, LevelRegionStatisticsItem>();
        if (Array.isArray(apiData)) {
            apiData.forEach((row) => map.set(row.region_code, row));
        }
        return map;
    }, [apiData]);

    const selectedRegionData = useMemo(() => {
        const item = regionByName.get(selectedRegion);
        const name = REGION_NAMES_UZ[selectedRegion as keyof typeof REGION_NAMES_UZ] ?? selectedRegion;
        if (item) return item;
        return {
            region_code: selectedRegion,
            region_name: name,
            total: 0,
            otm: 0,
            itm: 0,
            others: 0,
            researchers: 0,
        };
    }, [selectedRegion, regionByName]);

    const regionStats = useMemo(
        () => [
            { label: 'Jami', value: formatNumber(selectedRegionData.total) },
            { label: 'OTM', value: formatNumber(selectedRegionData.otm) },
            { label: 'ITM', value: formatNumber(selectedRegionData.itm) },
            { label: 'Boshqalari', value: formatNumber(selectedRegionData.others) },
            {
                label: 'Ilmiy izlanuvchilar',
                value: formatNumber(selectedRegionData.researchers),
            },
        ],
        [selectedRegionData]
    );

    return (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            <div className="w-full lg:flex-1 bg-gray-50 rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-black mb-4">
                    Hududlar bo'yicha ma'lumot
                </h2>
                <MapContainer
                    mapId="level-uzbekistan-map"
                    selectedRegion={selectedRegion}
                    onSelectedRegion={setSelectedRegion}
                />
            </div>
            <div className="w-full lg:flex-1">
                {isLoading ? (
                    <PageLoading />
                ) : (
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                {selectedRegionData.region_name} bo'yicha statistikalar
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {regionStats.map((stat) => (
                                <StatCard
                                    key={stat.label}
                                    title={stat.label}
                                    value={stat.value}
                                />
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default LevelRegionGrid;
