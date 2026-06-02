import React from 'react';
import { FolderOpen, Users, Building2, GraduationCap, FlaskConical } from 'lucide-react';
import type { ArxivStatisticsResponse } from '@/api/requests/projectApi';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
    <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
            {icon}
        </div>
        <div className="min-w-0">
            <p className="text-gray-500 text-xs sm:text-sm truncate">{title}</p>
            <p className="text-gray-900 text-xl sm:text-2xl font-bold mt-0.5">
                {value.toLocaleString()}
            </p>
        </div>
    </div>
);

interface ArxivStatCardsProps {
    data: ArxivStatisticsResponse;
}

const ArxivStatCards: React.FC<ArxivStatCardsProps> = ({ data }) => {
    const cards = [
        {
            title: 'Jami loyihalar',
            value: data.total_projects,
            icon: <FolderOpen size={22} className="text-blue-600" />,
            color: 'bg-blue-50',
        },
        {
            title: 'Loyiha rahbarlari',
            value: data.total_project_owners,
            icon: <Users size={22} className="text-violet-600" />,
            color: 'bg-violet-50',
        },
        {
            title: 'Ijrochi tashkilotlar',
            value: data.total_executive_organizations,
            icon: <Building2 size={22} className="text-emerald-600" />,
            color: 'bg-emerald-50',
        },
        {
            title: 'OTM',
            value: data.total_otm,
            icon: <GraduationCap size={22} className="text-amber-600" />,
            color: 'bg-amber-50',
        },
        {
            title: 'ITM',
            value: data.total_itm,
            icon: <FlaskConical size={22} className="text-rose-600" />,
            color: 'bg-rose-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
            {cards.map((card, i) => (
                <StatCard key={i} {...card} />
            ))}
        </div>
    );
};

export default ArxivStatCards;
