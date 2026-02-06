import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export interface LevelChartSegment {
    name: string;
    value: number;
    color: string;
    [key: string]: string | number;
}

interface LevelDonutChartProps {
    title?: string;
    totalLabel: string;
    totalValue: number;
    segments: LevelChartSegment[];
}

const LevelDonutChart: React.FC<LevelDonutChartProps> = ({
    title,
    totalLabel,
    totalValue,
    segments,
}) => {
    const chartData = segments.filter((s) => s.value > 0);
    const hasData = chartData.length > 0;

    return (
        <div className="w-full border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm">
            {title && (
                <h3 className="text-gray-700 text-sm font-medium mb-4">{title}</h3>
            )}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <div className="w-full sm:w-3/5 flex justify-center min-h-[220px] sm:min-h-[280px]">
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={
                                    hasData
                                        ? chartData
                                        : [{ name: '—', value: 1, color: '#e5e7eb' }]
                                }
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={100}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {(hasData ? chartData : [{ color: '#e5e7eb' }]).map(
                                    (entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    )
                                )}
                            </Pie>
                            <Tooltip
                                formatter={(value?: number, name?: string) => [
                                    (value ?? 0).toLocaleString(),
                                    name ?? '',
                                ]}
                                contentStyle={{ fontSize: '14px', borderRadius: '8px' }}
                            />
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-xs sm:text-sm font-medium"
                                fill="#535862"
                            >
                                <tspan x="50%" dy="-12">
                                    {totalLabel}
                                </tspan>
                                <tspan x="50%" dy="22" fontSize="18" fontWeight="bold">
                                    {totalValue.toLocaleString()}
                                </tspan>
                            </text>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-2/5 grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
                    {segments.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-600 text-xs sm:text-sm truncate">
                                {item.name}
                            </span>
                            <span className="text-gray-900 font-medium text-xs sm:text-sm shrink-0 ml-auto">
                                {item.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LevelDonutChart;
