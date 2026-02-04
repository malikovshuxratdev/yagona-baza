import React from 'react';
import { useStatisticsQuery } from '@/hooks';

const RegionsGridComponent: React.FC = () => {
    const { data, isPending } = useStatisticsQuery();

    return (
        <div className="p-4 bg-gray-50 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold mb-3 px-1">
                Respublika bo'yicha
            </h2>

            {isPending ? (
                <div className="flex flex-col space-y-2">
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}
                            className="h-12 bg-gray-200 animate-pulse rounded-xl"
                        ></div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col space-y-2 max-h-auto overflow-y-auto pr-1">
                    {data?.regions.map((region, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-gray-700 font-medium text-sm sm:text-base">
                                {region.name.uz}
                            </span>
                            <span className="text-gray-900 font-semibold">
                                {region.users_count} ta
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RegionsGridComponent;
