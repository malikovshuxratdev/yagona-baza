import { AxiosResponse } from "axios";
import { akademApiClient } from "../baseClient";
import { AkademStatisticsResponse, AkademWinnersResponse } from "@/types";

const urls = {
    getAkademStatistics: '/stats/',
    getAkademWinners: '/stats/winners',
}

export class AkademApi {
    constructor(private api = akademApiClient) { }

    getAkademStatistics = async () => {
        const result: AxiosResponse<AkademStatisticsResponse> =
            await this.api.get(urls.getAkademStatistics);
        return result.data;
    };

    getAkademWinners = async () => {
        const result: AxiosResponse<AkademWinnersResponse> =
            await this.api.get(urls.getAkademWinners);
        return result.data;
    };
}

export const akademApi = new AkademApi();