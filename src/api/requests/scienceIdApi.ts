import { AxiosResponse } from "axios";
import { scienceIdApiClient } from "../baseClient";
import {
    ScienceIdStatisticsResponse,
    ScienceIdUserListResponse,
    ScienceIdUserDetailResponse,
    ScienceIdUserRegisterStatisticsDailyByMonthResponse,
    ScienceIdUserRegisterStatisticsDailyByYearResponse,
} from "@/types";

const urls = {
    getStatisticsData: '/statistics/',
    getUserList: '/api/scientists/list/',
    getUserDetail: (id: number) => `/api/scientists/detail/${id}`,
    getUserRegisterStatisticsDailyByMonth: (year: number, month: number) => `/statistics/user-register-statistics-daily-by-month/${year}/${month}/`,
    getUserRegisterStatisticsDailyByYear: (year: number) => `/statistics/user-register-statistics-monthly-by-year/${year}/`,
};

export class ScienceIdApi {
    constructor(private api = scienceIdApiClient) { }


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

    getUserRegisterStatisticsDailyByMonth = async (year: number, month: number) => {
        const result: AxiosResponse<ScienceIdUserRegisterStatisticsDailyByMonthResponse> =
            await this.api.get(
                urls.getUserRegisterStatisticsDailyByMonth(year, month)
            );
        return result.data;
    };


    getUserRegisterStatisticsDailyByYear = async (year: number) => {
        const result: AxiosResponse<ScienceIdUserRegisterStatisticsDailyByYearResponse> =
            await this.api.get(
                urls.getUserRegisterStatisticsDailyByYear(year)
            );
        return result.data;
    };
}

export const scienceIdApi = new ScienceIdApi();