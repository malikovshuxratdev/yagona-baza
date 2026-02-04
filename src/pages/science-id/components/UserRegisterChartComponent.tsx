import React, { useMemo, useState } from 'react';
import moment from 'moment';
import 'moment/locale/uz-latn';
import { RegisterChartByDate } from '@/components/shared';
import type { RegisterChartTabKey } from '@/components/shared';
import {
    useScienceUserRegisterStatisticsDailyByMonthQuery,
    useScienceUserRegisterStatisticsDailyByYearQuery,
} from '@/hooks';

const MONTH_NAMES = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentabr',
    'Oktabr',
    'Noyabr',
    'Dekabr',
];

const getCurrentMonth = (): { year: number; month: number } => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
};

const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
};

const UserRegisterChartComponent: React.FC = () => {
    const currentMonth = useMemo(() => getCurrentMonth(), []);
    const [activeTab, setActiveTab] = useState<RegisterChartTabKey>('month');
    const [monthValue, setMonthValue] = useState<moment.Moment | null>(() =>
        moment().year(currentMonth.year).month(currentMonth.month - 1).startOf('month')
    );
    const [yearValue, setYearValue] = useState<moment.Moment | null>(() =>
        moment().year(new Date().getFullYear()).startOf('year')
    );

    const yearMonth = useMemo(() => {
        if (activeTab === 'month' && monthValue) {
            return { year: monthValue.year(), month: monthValue.month() + 1 };
        }
        return { year: currentMonth.year, month: currentMonth.month };
    }, [activeTab, monthValue, currentMonth.year, currentMonth.month]);

    const yearOnly = useMemo(() => {
        if (activeTab === 'year' && yearValue) return yearValue.year();
        return new Date().getFullYear();
    }, [activeTab, yearValue]);

    const { data: dataByMonth, isPending: isPendingMonth } =
        useScienceUserRegisterStatisticsDailyByMonthQuery(
            yearMonth.year,
            yearMonth.month
        );
    const { data: dataByYear, isPending: isPendingYear } =
        useScienceUserRegisterStatisticsDailyByYearQuery(yearOnly);

    const chartDataByMonth = useMemo(() => {
        const { year, month } = yearMonth;
        const daysInMonth = getDaysInMonth(year, month);
        const countByDay = new Map<number, number>();
        if (Array.isArray(dataByMonth)) {
            dataByMonth.forEach((item) =>
                countByDay.set(item.day, Number(item.count))
            );
        }
        return Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            return {
                xLabel: day.toString().padStart(2, '0'),
                count: countByDay.get(day) ?? 0,
            };
        });
    }, [dataByMonth, yearMonth]);

    const chartDataByYear = useMemo(() => {
        const countByMonth = new Map<number, number>();
        if (Array.isArray(dataByYear)) {
            dataByYear.forEach((item) =>
                countByMonth.set(item.month, Number(item.count))
            );
        }
        return Array.from({ length: 12 }, (_, i) => {
            const month = i + 1;
            return {
                xLabel: MONTH_NAMES[i],
                count: countByMonth.get(month) ?? 0,
            };
        });
    }, [dataByYear]);

    return (
        <RegisterChartByDate
            title="Ro'yxatdan o'tgan foydalanuvchilar"
            activeTab={activeTab}
            onTabChange={setActiveTab}
            monthValue={monthValue}
            onMonthChange={setMonthValue}
            yearValue={yearValue}
            onYearChange={setYearValue}
            chartDataByMonth={chartDataByMonth}
            chartDataByYear={chartDataByYear}
            isPendingMonth={isPendingMonth}
            isPendingYear={isPendingYear}
        />
    );
};

export default UserRegisterChartComponent;
