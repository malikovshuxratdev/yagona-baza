import React from 'react';

export interface InternshipDashboardStats {
    totalSelections: number;
    totalApplications: number;
    meg1Passed: number;
    meg2Passed: number;
    rejected: number;
    inProgress: number;
    completed: number;
}

const StatCard: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-6 flex flex-col bg-white">
        <h3 className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-4">{title}</h3>
        <p className="text-gray-900 text-xl sm:text-2xl font-bold">{String(value)}</p>
    </div>
);

interface InternshipStatCardsProps {
    stats: InternshipDashboardStats;
}

const InternshipStatCards: React.FC<InternshipStatCardsProps> = ({ stats }) => {
    const cards = [
        { title: "Jami tanlovlar soni", value: stats.totalSelections },
        { title: "Kelib tushgan arizalar soni", value: stats.totalApplications },
        { title: "MEG 1-bosqichdan o'tgan arizalar soni", value: stats.meg1Passed },
        { title: "MEG 2-bosqichdan o'tgan arizalar soni", value: stats.meg2Passed },
        { title: "Rad etilgan arizalar soni", value: stats.rejected },
        { title: "Jarayondagi arizalar soni", value: stats.inProgress },
        { title: "Yakunlangan arizalar soni", value: stats.completed },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {cards.map((card, index) => (
                <StatCard key={index} title={card.title} value={card.value} />
            ))}
        </div>
    );
};

export default InternshipStatCards;
