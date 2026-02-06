import { AxiosResponse } from 'axios';
import { levelApiClient, levelMonitoringApiClient } from '../baseClient';
import {
    LevelUserCountResponse,
    LevelRegionStatisticsResponse,
} from '@/types';

const urls = {
    getLevelUserCount: '/api/statistics/user_count',
    getLevelMonitoring: '/daraja-statistics',
};

export class LevelApi {
    constructor(private api = levelApiClient) { }

    getLevelUserCount = async () => {
        const result: AxiosResponse<LevelUserCountResponse> =
            await this.api.get(urls.getLevelUserCount);
        return result.data;
    };
}

export const levelApi = new LevelApi();

export class LevelMonitoringApi {
    constructor(private api = levelMonitoringApiClient) { }

    getLevelMonitoring = async () => {
        const result: AxiosResponse<LevelRegionStatisticsResponse> =
            await this.api.get(urls.getLevelMonitoring);
        return result.data;
    };
}

export const levelMonitoringApi = new LevelMonitoringApi();
