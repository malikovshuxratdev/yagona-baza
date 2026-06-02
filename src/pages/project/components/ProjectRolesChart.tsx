import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { RoleStatItem, ApiColor } from '@/api/requests/projectApi';

const COLOR_MAP: Record<ApiColor, string> = {
    info: '#06B6D4',
    success: '#22C55E',
    warning: '#EAB308',
    danger: '#EF4444',
    primary: '#3B82F6',
};

interface ProjectRolesChartProps {
    roles: RoleStatItem[];
}

const ProjectRolesChart: React.FC<ProjectRolesChartProps> = ({ roles }) => {
    const total = roles.reduce((sum, r) => sum + r.count, 0);
    const segments = roles.map((r) => ({
        name: r.roleName,
        value: r.count,
        color: COLOR_MAP[r.color] ?? '#6B7280',
    }));

    return (
        <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm">
            <h3 className="text-gray-700 text-sm font-medium mb-4">
                Foydalanuvchilar rollari bo'yicha
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="w-full sm:w-3/5 flex justify-center">
                    <ResponsiveContainer width="100%" height={260}>
                        <PieChart>
                            <Pie
                                data={segments}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={100}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {segments.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number, name: string) => [
                                    value.toLocaleString(),
                                    name,
                                ]}
                                contentStyle={{ fontSize: '13px', borderRadius: '8px' }}
                            />
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill="#535862"
                            >
                                <tspan x="50%" dy="-12" fontSize="12">
                                    Jami
                                </tspan>
                                <tspan x="50%" dy="22" fontSize="20" fontWeight="bold">
                                    {total.toLocaleString()}
                                </tspan>
                            </text>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-2/5 space-y-3">
                    {segments.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-600 text-sm flex-1 truncate">
                                {item.name}
                            </span>
                            <span className="text-gray-900 font-semibold text-sm shrink-0">
                                {item.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectRolesChart;
