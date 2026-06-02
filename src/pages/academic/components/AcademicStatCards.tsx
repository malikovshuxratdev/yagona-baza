import React from 'react';
import { Trophy, FileText, Award, Banknote } from 'lucide-react';
import { formatNumber } from '@/helpers';

interface AcademicStatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

const AcademicStatCard: React.FC<AcademicStatCardProps> = ({ title, value, icon, color }) => (
    <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
            <p className="text-gray-900 text-xl sm:text-2xl font-bold mt-0.5">{value}</p>
        </div>
    </div>
);

interface AcademicStatCardsProps {
    contests: number;
    applications: number;
    winnerApplications: number;
    fundingAmount: number;
}

const AcademicStatCards: React.FC<AcademicStatCardsProps> = ({
    contests,
    applications,
    winnerApplications,
    fundingAmount,
}) => {
    const cards = [
        {
            title: "O'tkazilgan tanlovlar",
            value: `${formatNumber(contests)} ta`,
            icon: <Trophy size={22} className="text-blue-600" />,
            color: 'bg-blue-50',
        },
        {
            title: 'Kelib tushgan arizalar',
            value: `${formatNumber(applications)} ta`,
            icon: <FileText size={22} className="text-violet-600" />,
            color: 'bg-violet-50',
        },
        {
            title: "G'olib deb topilgan loyihalar",
            value: `${formatNumber(winnerApplications)} ta`,
            icon: <Award size={22} className="text-amber-600" />,
            color: 'bg-amber-50',
        },
        {
            title: "Jami ajratilgan mablag'",
            value: `${formatNumber(fundingAmount)} so'm`,
            icon: <Banknote size={22} className="text-emerald-600" />,
            color: 'bg-emerald-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {cards.map((card, i) => (
                <AcademicStatCard key={i} {...card} />
            ))}
        </div>
    );
};

export default AcademicStatCards;
