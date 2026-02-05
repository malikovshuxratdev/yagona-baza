import React, { useState, useMemo } from 'react';
import { MapContainer, PageLoading } from '@/components';
import { useReestrRegionStatisticsQuery } from '@/hooks';
import { getSoatoByRegionCode, getRegionNameUz, RegionSoato } from '@/constants';
import { getReestrLabelUz } from '@/constants';

const ReestrRegionGrid: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState<string>('TN');
    const soato = useMemo(
        () => getSoatoByRegionCode(selectedRegion) ?? RegionSoato.TN,
        [selectedRegion]
    );
    const { data, isLoading, isError } = useReestrRegionStatisticsQuery(soato);

    const regionTitle = data?.region_name?.uz ?? getRegionNameUz(selectedRegion);
    const items = data?.items ?? [];

    return (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            <div className="w-full lg:flex-1 bg-gray-50 rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-black mb-4">
                    Hududlar bo'yicha ma'lumot
                </h2>
                <MapContainer
                    mapId="reestr-uzbekistan-map"
                    selectedRegion={selectedRegion}
                    onSelectedRegion={setSelectedRegion}
                />
            </div>
            <div className="w-full lg:flex-1 bg-gray-50 rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-black mb-4">
                    {regionTitle} bo'yicha ma'lumotlar
                </h2>
                {isLoading ? (
                    <PageLoading />
                ) : isError ? (
                    <div className="py-8 text-center text-muted-foreground text-sm">
                        Ma'lumot yuklashda xatolik
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <table className="w-full">
                            <tbody>
                                {items.map((row, index) => (
                                    <tr
                                        key={row.org_class}
                                        className={
                                            index % 2 === 0
                                                ? 'bg-[#EFF6FF]'
                                                : 'bg-white'
                                        }
                                    >
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                            {getReestrLabelUz(row.label)}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                            {row.count}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReestrRegionGrid;
