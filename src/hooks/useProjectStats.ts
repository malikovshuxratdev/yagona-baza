import { useQuery } from './useQuery';
import { projectApi } from '@/api';

export const useArxivStatsQuery = () => {
    return useQuery({
        queryKey: ['arxiv-stats'],
        queryFn: () => projectApi.getArxivStatistics(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

export const useProjectStatsQuery = () => {
    return useQuery({
        queryKey: ['project-stats'],
        queryFn: () => projectApi.getProjectStats(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};
