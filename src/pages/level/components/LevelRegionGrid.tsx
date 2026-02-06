import React, { useState, useMemo } from 'react';
import { MapContainer, PageLoading } from '@/components';
import { useLevelRegionStatisticsQuery } from '@/hooks';
import { REGION_NAMES_UZ } from '@/constants/regionSoato';
import type { LevelRegionStatisticsItem } from '@/types';
import { REGION_CODE_TO_LEVEL_API_ID } from '@/types';
import { formatNumber } from '@/helpers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/50 px-4 py-3">
        <span className="text-sm text-gray-600">{title}</span>
        <span className="font-semibold text-gray-900">{value}</span>
    </div>
);

const EMPTY_REGION_DATA = (regionId: number, regionName: string): LevelRegionStatisticsItem => ({
    region_id: regionId,
    region_name: regionName,
    doktarantura_tashkilotlar_jami: 0,
    otm: 0,
    itm: 0,
    boshqa: 0,
    doktaranturalar_soni: 0,
});

const LevelRegionGrid: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState<string>('TN');
    const { data: apiData, isLoading } = useLevelRegionStatisticsQuery();

    const regionById = useMemo(() => {
        const map = new Map<number, LevelRegionStatisticsItem>();
        const stats = apiData?.stats;
        if (Array.isArray(stats)) {
            stats.forEach((row) => map.set(row.region_id, row));
        }
        return map;
    }, [apiData]);

    const selectedRegionData = useMemo(() => {
        const regionId = REGION_CODE_TO_LEVEL_API_ID[selectedRegion];
        const name = REGION_NAMES_UZ[selectedRegion as keyof typeof REGION_NAMES_UZ] ?? selectedRegion;
        if (regionId === undefined) {
            return EMPTY_REGION_DATA(0, name);
        }
        const item = regionById.get(regionId);
        if (item) return item;
        return EMPTY_REGION_DATA(regionId, name);
    }, [selectedRegion, regionById]);

    const regionStats = useMemo(
        () => [
            {
                label: 'Jami tashkilotlar',
                value: formatNumber(selectedRegionData.doktarantura_tashkilotlar_jami),
            },
            { label: 'OTM', value: formatNumber(selectedRegionData.otm) },
            { label: 'ITM', value: formatNumber(selectedRegionData.itm) },
            { label: 'Boshqa tashkilotlar', value: formatNumber(selectedRegionData.boshqa) },
            {
                label: 'Izlanuvchilar soni',
                value: formatNumber(selectedRegionData.doktaranturalar_soni),
            },
        ],
        [selectedRegionData]
    );

    return (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            <div className="w-full lg:flex-1 bg-gray-50 rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-black mb-4">
                    Hududlar kesimida ma'lumot
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
                                {selectedRegionData.region_name} bo‘yicha ma'lumot
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
