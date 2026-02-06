import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export interface InternshipChartSegment {
    name: string;
    value: number;
    color: string;
    // Recharts expects each data item to be a ChartDataInput
    // which has an index signature. We add one here to satisfy
    // the type without changing runtime behaviour.
    [key: string]: string | number;
}

interface InternshipApplicationsDonutChartProps {
    totalLabel: string;
    totalValue: number;
    segments: InternshipChartSegment[];
}

const InternshipApplicationsDonutChart: React.FC<InternshipApplicationsDonutChartProps> = ({
    totalLabel,
    totalValue,
    segments,
}) => {
    const chartData = segments.filter((s) => s.value > 0);
    const hasData = chartData.length > 0;

    return (
        <div className="w-full border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <div className="w-full sm:w-4/5 flex justify-center min-h-[280px] sm:min-h-[350px]">
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={hasData ? chartData : [{ name: '—', value: 1, color: '#e5e7eb' }]}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {(hasData ? chartData : [{ color: '#e5e7eb' }]).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value?: number, name?: string) => [value ?? 0, name ?? '']}
                                contentStyle={{ fontSize: '14px' }}
                            />
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-xs sm:text-sm font-medium"
                                fill="#535862"
                            >
                                <tspan x="50%" dy="-15">
                                    {totalLabel}
                                </tspan>
                                <tspan x="50%" dy="25" fontSize="20" fontWeight="bold">
                                    {totalValue}
                                </tspan>
                            </text>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full sm:w-2/5 grid grid-cols-2 sm:grid-cols-1 gap-3">
                    {segments.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-gray-600 text-sm truncate">{item.name}</span>
                            <span className="text-gray-900 font-medium text-sm shrink-0 ml-auto sm:ml-1">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InternshipApplicationsDonutChart;
