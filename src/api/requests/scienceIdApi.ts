import { AxiosResponse } from "axios";
import { baseApiClient } from "../baseClient";
import {
    ScienceIdStatisticsResponse,
    ScienceIdUserListResponse,
    ScienceIdUserDetailResponse,
} from "@/types";

const urls = {
    getStatisticsData: '/statistics/',
    getUserList: '/api/scientists/list/',
    getUserDetail: (id: number) => `/api/scientists/detail/${id}`,
};

export class ScienceIdApi {
    constructor(private api = baseApiClient) { }


    getStatisticsData = async () => {
        const result: AxiosResponse<ScienceIdStatisticsResponse> =
            await this.api.get(
                urls.getStatisticsData
            );
        return result.data;
    };

    getUserList = async (params: { page: number, page_size: number }) => {
        const result: AxiosResponse<ScienceIdUserListResponse> =
            await this.api.get(
                urls.getUserList,
                params
            );
        return result.data;
    };

    getUserDetail = async (id: number) => {
        const result: AxiosResponse<ScienceIdUserDetailResponse> =
            await this.api.get(
                urls.getUserDetail(id)
            );
        return result.data;
    };
}

export const scienceIdApi = new ScienceIdApi();