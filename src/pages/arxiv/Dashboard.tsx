import React from 'react';
import { useArxivStatsQuery } from '@/hooks';
import { PageLoading } from '@/components';
import { ProjectArxivStatCards, ProjectByYearChart } from '@/pages/project/components';

const ArxivDashboardPage: React.FC = () => {
    const { data, isPending, isError } = useArxivStatsQuery();

    if (isPending) return <PageLoading />;

    if (isError) {
        return (
            <div className="border border-red-100 bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm">
                Arxiv statistikalarini yuklashda xatolik yuz berdi.
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center text-gray-500 py-12 text-sm">
                Ma'lumot mavjud emas.
            </div>
        );
    }

    return (
        <div className="mx-auto space-y-6">
            <div className="text-center">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900">
                    arxiv.ilmiy.uz statistikasi
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Ilmiy dasturlar va loyihalar bo'yicha umumiy ma'lumot
                </p>
            </div>

            <ProjectArxivStatCards data={data} />

            {data.by_year && data.by_year.length > 0 && (
                <ProjectByYearChart data={data.by_year} />
            )}
        </div>
    );
};

export default ArxivDashboardPage;
