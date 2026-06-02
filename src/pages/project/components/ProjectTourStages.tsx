import React from 'react';
import type { TourItem, ApiColor } from '@/api/requests/projectApi';

const COLOR_MAP: Record<ApiColor, { bg: string; text: string; dot: string }> = {
    primary: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
    danger: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
    success: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    info: { bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500' },
};

interface ProjectTourStagesProps {
    total: number;
    items: TourItem[];
}

const ProjectTourStages: React.FC<ProjectTourStagesProps> = ({ total, items }) => {
    return (
        <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-700 text-sm font-medium">
                    Ko'rib chiqish bosqichlari
                </h3>
                <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                    Jami: <span className="font-semibold text-gray-800">{total.toLocaleString()}</span>
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="border border-gray-100 rounded-xl p-3 sm:p-4 bg-gray-50"
                    >
                        <p className="text-gray-800 text-sm font-medium mb-3 truncate">
                            {item.name}
                        </p>
                        <div className="space-y-2">
                            {item.stats.map((stat, j) => {
                                const colors = COLOR_MAP[stat.color] ?? COLOR_MAP.primary;
                                return (
                                    <div key={j} className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <div className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
                                            <span className="text-gray-600 text-xs truncate">
                                                {stat.name}
                                            </span>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${colors.bg} ${colors.text}`}
                                        >
                                            {stat.count.toLocaleString()}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectTourStages;
