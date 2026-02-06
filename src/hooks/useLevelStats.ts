import { levelApi } from '@/api';
import { useQuery } from './useQuery';
import { DEFAULT_LEVEL_REGION_STATISTICS } from '@/constants/levelDefaultData';

export const useLevelUserCountQuery = () => {
    return useQuery({
        queryKey: ['level-user-count'],
        queryFn: levelApi.getLevelUserCount,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

/** Hozircha API yo'q – default qiymatlar. API qo'shilganda: queryFn: levelApi.getLevelRegionStatistics */
export const useLevelRegionStatisticsQuery = () => {
    return useQuery({
        queryKey: ['level-region-statistics'],
        queryFn: () => Promise.resolve(DEFAULT_LEVEL_REGION_STATISTICS),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};