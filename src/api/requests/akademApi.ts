import { AxiosResponse } from "axios";
import { academApiClient } from "../baseClient";
import { AkademStatisticsResponse, AkademWinnersResponse } from "@/types";

const urls = {
    getAcademStatistics: '/stats/',
    getAcademWinners: '/stats/winners',
};

export class AcademApi {
    constructor(private api = academApiClient) { }

    getAcademStatistics = async () => {
        const result: AxiosResponse<AkademStatisticsResponse> =
            await this.api.get(urls.getAcademStatistics);
        return result.data;
    };

    getAcademWinners = async (page = 1, pageSize = 10) => {
        const result: AxiosResponse<AkademWinnersResponse> =
            await this.api.get(urls.getAcademWinners, {
                params: { page, page_size: pageSize },
            });
        return result.data;
    };
}

export const academApi = new AcademApi();