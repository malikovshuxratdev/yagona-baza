import { AxiosResponse } from "axios";
import { levelApiClient } from "../baseClient";
import { LevelUserCountResponse } from "@/types";

const urls = {
    getLevelUserCount: '/api/statistics/user_count',
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