import React, { useMemo } from 'react';
import LevelDonutChart from './LevelDonutChart';
import { useLevelUserCountQuery } from '@/hooks';
import { PageLoading } from '@/components';
import type { LevelUserCount } from '@/types';

function aggregateLevelData(data: LevelUserCount[]): LevelUserCount {
    if (!data || data.length === 0) {
        return {
            male_user: 0,
            female_user: 0,
            local_user: 0,
            foreign_user: 0,
            phd_user: 0,
            dc_user: 0,
            senior_research_fellow_user: 0,
            accociate_professor_user: 0,
            professor_user: 0,
            academic_user: 0,
        };
    }
    if (data.length === 1) return data[0];
    return data.reduce(
        (acc, item) => ({
            male_user: acc.male_user + item.male_user,
            female_user: acc.female_user + item.female_user,
            local_user: acc.local_user + item.local_user,
            foreign_user: acc.foreign_user + item.foreign_user,
            phd_user: acc.phd_user + item.phd_user,
            dc_user: acc.dc_user + item.dc_user,
            senior_research_fellow_user:
                acc.senior_research_fellow_user + item.senior_research_fellow_user,
            accociate_professor_user:
                acc.accociate_professor_user + item.accociate_professor_user,
            professor_user: acc.professor_user + item.professor_user,
            academic_user: acc.academic_user + item.academic_user,
        }),
        {
            male_user: 0,
            female_user: 0,
            local_user: 0,
            foreign_user: 0,
            phd_user: 0,
            dc_user: 0,
            senior_research_fellow_user: 0,
            accociate_professor_user: 0,
            professor_user: 0,
            academic_user: 0,
        }
    );
}

const CHART_COLORS = {
    male: '#14B8A6',
    female: '#F472B6',
    local: '#3B82F6',
    foreign: '#EAB308',
    phd: '#7C3AED',
    dc: '#A78BFA',
    seniorFellow: '#14B8A6',
    associateProf: '#F472B6',
    professor: '#EAB308',
    academic: '#6366F1',
};

const LevelStatisticsComponent: React.FC = () => {
    const { data, isPending, isError } = useLevelUserCountQuery();

    const aggregated = useMemo(() => {
        const raw = Array.isArray(data) ? data : data ? [data] : [];
        return aggregateLevelData(raw);
    }, [data]);

    const genderSegments = useMemo(
        () => [
            { name: 'Erkak foydalanuvchilar', value: aggregated.male_user, color: CHART_COLORS.male },
            { name: 'Ayol foydalanuvchilar', value: aggregated.female_user, color: CHART_COLORS.female },
        ],
        [aggregated]
    );

    const degreeSegments = useMemo(
        () => [
            { name: 'PhD', value: aggregated.phd_user, color: CHART_COLORS.phd },
            { name: 'Dsc', value: aggregated.dc_user, color: CHART_COLORS.dc },
        ],
        [aggregated]
    );

    const titleSegments = useMemo(
        () => [
            {
                name: 'Katta ilmiy xodim',
                value: aggregated.senior_research_fellow_user,
                color: CHART_COLORS.seniorFellow,
            },
            {
                name: 'Dotsent',
                value: aggregated.accociate_professor_user,
                color: CHART_COLORS.associateProf,
            },
            {
                name: 'Professor',
                value: aggregated.professor_user,
                color: CHART_COLORS.professor,
            },
            {
                name: 'Akademik',
                value: aggregated.academic_user,
                color: CHART_COLORS.academic,
            },
        ],
        [aggregated]
    );

    const locationSegments = useMemo(
        () => [
            { name: 'Mahalliy', value: aggregated.local_user, color: CHART_COLORS.local },
            { name: 'Xorijiy', value: aggregated.foreign_user, color: CHART_COLORS.foreign },
        ],
        [aggregated]
    );

    const genderTotal = aggregated.male_user + aggregated.female_user;
    const degreeTotal = aggregated.phd_user + aggregated.dc_user;
    const titleTotal =
        aggregated.senior_research_fellow_user +
        aggregated.accociate_professor_user +
        aggregated.professor_user +
        aggregated.academic_user;
    const locationTotal = aggregated.local_user + aggregated.foreign_user;

    if (isPending) return <PageLoading />;
    if (isError) {
        return (
            <div className="text-gray-600 py-8">
                Statistikani yuklashda xatolik yuz berdi.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LevelDonutChart
                title="Foydalanuvchilar soni"
                totalLabel="Jami"
                totalValue={genderTotal}
                segments={genderSegments}
            />
            <LevelDonutChart
                title="Ilmiy daraja bo'yicha"
                totalLabel="Jami"
                totalValue={degreeTotal}
                segments={degreeSegments}
            />
            <LevelDonutChart
                title="Ilmiy unvon bo'yicha"
                totalLabel="Jami"
                totalValue={titleTotal}
                segments={titleSegments}
            />
            <LevelDonutChart
                title="Foydalanuvchilar joylashgan hudud bo'yicha"
                totalLabel="Jami"
                totalValue={locationTotal}
                segments={locationSegments}
            />
        </div>
    );
};

export default LevelStatisticsComponent;
