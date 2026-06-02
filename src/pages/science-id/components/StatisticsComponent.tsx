import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useStatisticsQuery } from '@/hooks';
import { PageLoading } from '@/components';

const StatCard: React.FC<{ title: string; value: string }> = ({ title, value }) => {
    return (
        <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm flex flex-col">
            <h3 className="text-gray-500 text-xs sm:text-sm mb-2">
                {title}
            </h3>
            <p className="text-gray-900 text-xl sm:text-2xl font-bold">
                {value}
            </p>
        </div>
    );
}

const StatisticsComponent: React.FC = () => {
    const { data, isPending } = useStatisticsQuery();

    const chartData = [
        {
            name: 'Erkaklar 40 yoshgacha',
            value: data?.overall.less40_male_count,
            color: '#22C55E',
        },
        {
            name: 'Ayollar 40 yoshgacha',
            value: data?.overall.less40_female_count,
            color: '#EF4444',
        },
        {
            name: 'Erkaklar 40 yoshdan oshiq',
            value: data?.overall.more40_male_count,
            color: '#EAB308',
        },
        {
            name: 'Ayollar 40 yoshdan oshiq',
            value: data?.overall.more40_female_count,
            color: '#3B82F6',
        },
    ];

    const filteredChartData = chartData.filter((s) => s.value && s.value > 0);
    const hasData = filteredChartData.length > 0;

    const stats = [
        {
            title: 'Umumiy foydalanuvchilar',
            value: data?.overall.users_count,
        },
        {
            title: '40 yoshgacha bo\'lgan foydalanuvchilar',
            value: data?.overall.less40_count,
        },
        {
            title: 'Erkak foydalanuvchilar',
            value: data?.overall.male_count,
        },
        {
            title: 'Ilmiy darajaga ega foydalanuvchilar',
            value: data?.overall.academic_degree_users_count,
        },
        {
            title: 'Ayol foydalanuvchilar',
            value: data?.overall.female_count,
        },
        {
            title: 'Ilmiy unvonga ega foydalanuvchilar',
            value: data?.overall.academic_title_users_count,
        },
    ];

    return (
        <div>
            {isPending ? (
                <PageLoading />
            ) : (
                <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    <div className="w-full lg:w-1/2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                            {stats.map((stat, index) => (
                                <StatCard
                                    key={index}
                                    title={stat.title}
                                    value={stat.value?.toString() || '0'}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 border border-gray-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm mt-6 lg:mt-0">
                        <div className="flex flex-col sm:flex-row items-center justify-center">
                            <div className="w-full sm:w-4/5 flex justify-center">
                                <ResponsiveContainer width="100%" height={280}>
                                    <PieChart>
                                        <Pie
                                            data={hasData ? filteredChartData : [{ name: '—', value: 1, color: '#e5e7eb' }]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {(hasData ? filteredChartData : [{ color: '#e5e7eb' }]).map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <text
                                            x="50%"
                                            y="50%"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="text-xs sm:text-sm font-medium"
                                            fill="#535862"
                                        >
                                            <tspan x="50%" dy="-15">
                                                Umumiy
                                            </tspan>
                                            <tspan
                                                x="50%"
                                                dy="25"
                                                fontSize="20"
                                                fontWeight="bold"
                                            >
                                                {data?.overall.users_count || '0'}
                                            </tspan>
                                        </text>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-full sm:w-2/5 grid grid-cols-2 sm:grid-cols-1 gap-3 mt-4 sm:mt-0">
                                {chartData.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2"
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-gray-600 text-sm truncate">
                                            {item.name}
                                        </span>
                                        <span className="text-gray-900 font-medium text-sm shrink-0 ml-auto">
                                            {item.value ?? 0}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatisticsComponent;
