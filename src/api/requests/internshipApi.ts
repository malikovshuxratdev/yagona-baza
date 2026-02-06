import { AxiosResponse } from "axios";
import { internshipApiClient } from "../baseClient";
import { InternshipStatisticsResponse } from "@/types";

const urls = {
    getInternshipStatistics: '/stats/application',
    getStatsByRegionList: '/stats/application'
}

export class InternshipApi {
    constructor(private api = internshipApiClient) { }

    getInternshipStatistics = async () => {
        const result: AxiosResponse<InternshipStatisticsResponse> =
            await this.api.get(urls.getInternshipStatistics);
        return result.data;
    };

    getRegionList = async (params: { soato: number }) => {
        const result: AxiosResponse<any> =
            await this.api.get(urls.getStatsByRegionList, params);
        return result.data;
    };

}

export const internshipApi = new InternshipApi();