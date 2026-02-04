import React, { useState, useEffect } from 'react';
import { useStatisticsQuery } from '@/hooks';
import { MapContainer, PageLoading, RegionsGridComponent } from '@/components';

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => {
    return (
        <div className="border border-gray-200 bg-white rounded-lg p-4 sm:p-6 flex items-center justify-between">
            <h3 className="text-gray-600 text-[14px] sm:text-[16px]">
                {title}
            </h3>
            <p className="text-gray-900 text-[18px] sm:text-[20px] font-medium">
                {value}
            </p>
        </div>
    );
}

const InformationRegionComponent: React.FC = () => {
    const { data, isPending } = useStatisticsQuery();
    const [selectedRegion, setSelectedRegion] = useState('TN');
    const [regionStats, setRegionStats] = useState<
        { label: string; value: string }[]
    >([]);
    const getRegionName = (regionCode: string) => {
        const region = data?.regions.find((r) => r.code === regionCode);
        return region ? `${String(region.name.uz)}` : "Ma'lumot yo'q";
    };

    useEffect(() => {
        const regionData = data?.regions.find((r) => r.code === selectedRegion);
        if (regionData) {
            setRegionStats([
                {
                    label: 'Jami foydalanuvchilar soni',
                    value: `${regionData.users_count}`,
                },
                {
                    label: 'Erkaklar',
                    value: `${regionData.male_count}`,
                },
                {
                    label: 'Ayollar',
                    value: `${regionData.female_count}`,
                },
                {
                    label: '40 yoshgacha',
                    value: `${regionData.less40_count}`,
                },
                {
                    label: 'Ilmiy darajasi bor',
                    value: `${regionData.degree_count}`,
                },
                {
                    label: 'Ilmiy unvoni bor',
                    value: `${regionData.title_count}`,
                },
            ]);
        } else {
            setRegionStats([
                { label: 'Jami foydalanuvchilar soni', value: '0' },
                { label: 'Erkaklar', value: '0' },
                { label: 'Ayollar', value: '0' },
                { label: '40 yoshgacha', value: '0' },
                { label: 'Ilmiy darajasi bor', value: '0' },
                { label: 'Ilmiy unvoni bor', value: '0' },
            ]);
        }
    }, [selectedRegion, data]);

    return (
        <div className="mx-auto px-3 sm:px-4 lg:px-6 mt-[20px]">
            <div className="text-center mb-6 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900 mb-3 sm:mb-6">
                    Hududlar bo'yicha
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                <div className="w-full lg:w-2/3 order-2 lg:order-1 bg-gray-50 rounded-2xl shadow-sm p-6">
                    <div className="px-6 py-4">
                        <h2 className="text-xl sm:text-xl font-500 text-gray-900">
                            {getRegionName(selectedRegion)}
                        </h2>
                    </div>
                    <MapContainer
                        mapId="uzbekistan-map"
                        onSelectedRegion={setSelectedRegion}
                        selectedRegion={selectedRegion}
                    />
                    {isPending ? (
                        <PageLoading />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                            {regionStats.map((stat, index) => (
                                <StatCard
                                    key={index}
                                    title={stat.label}
                                    value={stat.value}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full lg:w-1/3 order-1 lg:order-2 mb-4 lg:mb-0">
                    <RegionsGridComponent />
                </div>
            </div>
        </div>
    );
};

export default InformationRegionComponent;
