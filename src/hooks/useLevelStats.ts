import { levelApi, levelMonitoringApi } from '@/api';
import { useQuery } from './useQuery';

export const useLevelUserCountQuery = () => {
    return useQuery({
        queryKey: ['level-user-count'],
        queryFn: async () =>
            await levelApi.getLevelUserCount(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

export const useLevelRegionStatisticsQuery = () => {
    return useQuery({
        queryKey: ['level-region-statistics'],
        queryFn: async () =>
            await levelMonitoringApi.getLevelMonitoring(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};