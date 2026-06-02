import React from 'react';
import { Users, ClipboardList, CheckCircle, XCircle, Clock, CheckCheck, ArrowRight } from 'lucide-react';

export interface InternshipDashboardStats {
    totalSelections: number;
    totalApplications: number;
    meg1Passed: number;
    meg2Passed: number;
    rejected: number;
    inProgress: number;
    completed: number;
}

interface StatCardProps {
    title: string;
    value: string | number;
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
            <p className="text-gray-900 text-xl sm:text-2xl font-bold mt-0.5">{String(value)}</p>
        </div>
    </div>
);

interface InternshipStatCardsProps {
    stats: InternshipDashboardStats;
}

const InternshipStatCards: React.FC<InternshipStatCardsProps> = ({ stats }) => {
    const cards = [
        {
            title: "Jami tanlovlar soni",
            value: stats.totalSelections,
            icon: <Users size={22} className="text-blue-600" />,
            color: 'bg-blue-50',
        },
        {
            title: "Kelib tushgan arizalar soni",
            value: stats.totalApplications,
            icon: <ClipboardList size={22} className="text-violet-600" />,
            color: 'bg-violet-50',
        },
        {
            title: "MEG 1-bosqichdan o'tgan arizalar soni",
            value: stats.meg1Passed,
            icon: <CheckCircle size={22} className="text-emerald-600" />,
            color: 'bg-emerald-50',
        },
        {
            title: "MEG 2-bosqichdan o'tgan arizalar soni",
            value: stats.meg2Passed,
            icon: <ArrowRight size={22} className="text-teal-600" />,
            color: 'bg-teal-50',
        },
        {
            title: "Rad etilgan arizalar soni",
            value: stats.rejected,
            icon: <XCircle size={22} className="text-red-600" />,
            color: 'bg-red-50',
        },
        {
            title: "Jarayondagi arizalar soni",
            value: stats.inProgress,
            icon: <Clock size={22} className="text-amber-600" />,
            color: 'bg-amber-50',
        },
        {
            title: "Yakunlangan arizalar soni",
            value: stats.completed,
            icon: <CheckCheck size={22} className="text-green-600" />,
            color: 'bg-green-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {cards.map((card, index) => (
                <StatCard key={index} {...card} />
            ))}
        </div>
    );
};

export default InternshipStatCards;
