import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import type { ArxivByYearItem } from '@/api/requests/projectApi';

interface ArxivByYearChartProps {
    data: ArxivByYearItem[];
}

const ArxivByYearChart: React.FC<ArxivByYearChartProps> = ({ data }) => {
    return (
        <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm">
            <h3 className="text-gray-700 text-sm font-medium mb-4">
                Yillar bo'yicha loyihalar (boshlangan / yakunlangan)
            </h3>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="year"
                        tick={{ fontSize: 13, fill: '#6B7280' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                        axisLine={false}
                        tickLine={false}
                        width={45}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', fontSize: '13px' }}
                        formatter={(value: number, name: string) => [
                            value.toLocaleString(),
                            name,
                        ]}
                    />
                    <Legend wrapperStyle={{ fontSize: '13px', paddingTop: '12px' }} />
                    <Bar
                        dataKey="start_count"
                        name="Boshlangan"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={32}
                    />
                    <Bar
                        dataKey="end_count"
                        name="Yakunlangan"
                        fill="#22C55E"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={32}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ArxivByYearChart;
