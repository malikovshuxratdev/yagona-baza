import { AxiosResponse } from 'axios';
import { levelApiClient } from '../baseClient';
import {
    LevelUserCountResponse,
    LevelRegionStatisticsResponse,
} from '@/types';

const urls = {
    getLevelUserCount: '/api/statistics/user_count',
    getLevelRegionStatistics: '/api/statistics/regions',
};

export class LevelApi {
    constructor(private api = levelApiClient) {}

    getLevelUserCount = async () => {
        const result: AxiosResponse<LevelUserCountResponse> =
            await this.api.get(urls.getLevelUserCount);
        return result.data;
    };

    getLevelRegionStatistics = async () => {
        const result: AxiosResponse<LevelRegionStatisticsResponse> =
            await this.api.get(urls.getLevelRegionStatistics);
        return result.data;
    };
}

export const levelApi = new LevelApi();