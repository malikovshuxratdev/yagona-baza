import { useMemo, useState } from 'react';
import { useQuery } from './useQuery';
import { academApi } from '@/api';

export const useAcademStatsQuery = () => {
    return useQuery({
        queryKey: ['academ-stats'],
        queryFn: () => academApi.getAcademStatistics(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

export const useAcademWinnersQuery = () => {
    const [params, setParams] = useState<{ page: number, page_size: number }>({
        page: 1,
        page_size: 20,
    });

    const query = useQuery({
        queryKey: ['academ-winners', params],
        queryFn: () => academApi.getAcademWinners(params.page, params.page_size),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const resData = useMemo(() => query.data?.results || [], [query.data]);

    const pagination = useMemo(
        () => ({
            page: query.data?.page || 1,
            pageSize: params.page_size,
            total: query.data?.count || 0,
            totalPages: Math.ceil((query.data?.count || 0) / params.page_size),
        }),
        [query.data]
    );

    const setPage = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
    };

    const setPageSize = (page_size: number) => {
        setParams((prev) => ({ ...prev, page_size }));
    };

    return {
        ...query,
        resData,
        pagination,
        setPage,
        setPageSize,
    };
};