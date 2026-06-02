import React from 'react';
import { useProjectStatsQuery } from '@/hooks';
import { PageLoading } from '@/components';
import { ProjectRolesChart, ProjectTourStages } from './components';

const ProjectDashboardPage: React.FC = () => {
    const { data, isPending, isError } = useProjectStatsQuery();

    if (isPending) return <PageLoading />;

    if (isError) {
        return (
            <div className="border border-red-100 bg-red-50 text-red-700 rounded-lg px-4 py-3 text-sm">
                Loyiha statistikalarini yuklashda xatolik yuz berdi.
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
                    loyiha.ilmiy.uz statistikasi
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    old-loyiha.ilmiy.uz API dan olingan ma'lumotlar
                </p>
            </div>

            {data.role && <ProjectRolesChart roles={data.role} />}

            {data.tour && (
                <ProjectTourStages
                    total={data.tour.total}
                    items={data.tour.items}
                />
            )}
        </div>
    );
};

export default ProjectDashboardPage;
