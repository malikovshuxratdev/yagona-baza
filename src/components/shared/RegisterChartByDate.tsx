import React, { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Tabs } from 'antd';
import generatePicker from 'antd/es/date-picker/generatePicker';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import type { Moment } from 'moment';
import { PageLoading } from '@/components';

const DatePicker = generatePicker<Moment>(momentGenerateConfig);

export type RegisterChartTabKey = 'month' | 'year';

export interface RegisterChartByDateProps {
    title: string;
    activeTab: RegisterChartTabKey;
    onTabChange: (key: RegisterChartTabKey) => void;
    monthValue: Moment | null;
    onMonthChange: (value: Moment | null) => void;
    yearValue: Moment | null;
    onYearChange: (value: Moment | null) => void;
    chartDataByMonth: { xLabel: string; count: number }[];
    chartDataByYear: { xLabel: string; count: number }[];
    isPendingMonth: boolean;
    isPendingYear: boolean;
    tabLabels?: { month: string; year: string };
    valueLabel?: string;
    xAxisLabelMonth?: string;
    xAxisLabelYear?: string;
    className?: string;
}

const RegisterChartByDate: React.FC<RegisterChartByDateProps> = ({
    title,
    activeTab,
    onTabChange,
    monthValue,
    onMonthChange,
    yearValue,
    onYearChange,
    chartDataByMonth,
    chartDataByYear,
    isPendingMonth,
    isPendingYear,
    tabLabels = { month: 'Kunlar bo\'yicha', year: 'Oylar bo\'yicha' },
    className = '',
}) => {
    const chartData = activeTab === 'month' ? chartDataByMonth : chartDataByYear;
    const isPending = activeTab === 'month' ? isPendingMonth : isPendingYear;

    const maxCount = useMemo(() => {
        const counts = chartData.map((d) => Number(d.count));
        return Math.max(0, ...counts);
    }, [chartData]);

    const yDomain: [number, number] = useMemo(
        () => [0, Math.max(3, Math.ceil(maxCount))],
        [maxCount]
    );

    const yTicks = useMemo(() => {
        const max = Math.ceil(maxCount);
        if (max <= 0) return [0, 1, 2, 3];
        if (max <= 3) return [0, 1, 2, 3];
        if (max <= 10) return Array.from({ length: max + 1 }, (_, i) => i);
        const step = Math.ceil(max / 10) || 1;
        const ticks: number[] = [];
        for (let i = 0; i <= max; i += step) ticks.push(i);
        if (ticks[ticks.length - 1] !== max) ticks.push(max);
        return ticks;
    }, [maxCount]);


    return (
        <div className={className}>
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <h2 className="text-lg sm:text-xl font-medium text-gray-900">
                        {title}
                    </h2>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <Tabs
                            activeKey={activeTab}
                            onChange={(k) => onTabChange(k as RegisterChartTabKey)}
                            items={[
                                { key: 'month', label: tabLabels.month },
                                { key: 'year', label: tabLabels.year },
                            ]}
                        />
                        {activeTab === 'month' && (
                            <DatePicker
                                picker="month"
                                value={monthValue}
                                onChange={onMonthChange}
                                format="MMMM YYYY"
                                allowClear={false}
                                className="min-w-[180px]"
                            />
                        )}
                        {activeTab === 'year' && (
                            <DatePicker
                                picker="year"
                                value={yearValue}
                                onChange={onYearChange}
                                format="YYYY"
                                allowClear={false}
                                className="min-w-[120px]"
                            />
                        )}
                    </div>
                </div>

                {isPending ? (
                    <PageLoading />
                ) : (
                    <div className="w-full" style={{ minHeight: 320 }}>
                        <ResponsiveContainer width="100%" height={320}>
                            <LineChart
                                data={chartData}
                                margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#e5e7eb"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="xLabel"
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                    axisLine={{ stroke: '#e5e7eb' }}
                                    tickLine={false}
                                    label={{
                                        position: 'insideBottom',
                                        offset: -5,
                                        style: { fill: '#6b7280', fontSize: 12 },
                                    }}
                                />
                                <YAxis
                                    domain={yDomain}
                                    ticks={yTicks}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                    tickFormatter={(value) => String(Math.round(value))}
                                    axisLine={false}
                                    tickLine={false}
                                    width={32}
                                    label={{
                                        angle: -90,
                                        position: 'insideLeft',
                                        style: { fill: '#6b7280', fontSize: 12 },
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: 8,
                                        border: '1px solid #e5e7eb',
                                    }}
                                    formatter={(value: number | undefined) => [
                                        value ?? 0,
                                        'Foydalanuvchilar soni',
                                    ]}
                                    labelFormatter={(label) =>
                                        `${activeTab === 'month' ? 'Sana' : 'Oy'}: ${label}`
                                    }
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ fill: '#3b82f6', r: 3 }}
                                    activeDot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterChartByDate;
