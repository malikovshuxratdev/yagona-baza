import { useState, useMemo } from 'react';
import { useQuery } from './useQuery';
import { scienceIdApi } from '@/api';

export const useStatisticsQuery = () => {
    return useQuery({
        queryKey: ['science-id-statistics'],
        queryFn: async () => {
            return await scienceIdApi.getStatisticsData();
        },
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

export const useScienceUserQuery = () => {
    const [params, setParams] = useState<{ page: number, page_size: number }>({
        page: 1,
        page_size: 20,
    });

    const query = useQuery({
        queryKey: ['science-id-user-list', params],
        queryFn: () => scienceIdApi.getUserList({ ...params }),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const resData = useMemo(() => query.data?.results || [], [query.data]);

    const pagination = useMemo(
        () => ({
            page: query.data?.page || 1,
            pageSize: params.page_size,
            total: query.data?.count || 0,
            totalPages: Math.ceil(
                (query.data?.count || 0) / params.page_size
            ),
        }),
        [params, query.data]
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
    }
}

export const useScienceUserDetailQuery = (id: number) => {
    const query = useQuery({
        queryKey: ['science-id-user-detail', id],
        queryFn: () => scienceIdApi.getUserDetail(id),
        enabled: !!id,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    return query;
}