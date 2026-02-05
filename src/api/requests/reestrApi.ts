import { AxiosResponse } from "axios";
import { reestrApiClient } from "@/api/baseClient";
import {
    ReestrOrgClassStatisticsResponse,
    ReestrPassportTemplateStatisticsResponse
} from "@/types";

const urls = {
    getOrgClassStatistics: '/statistics/by/org-class',
    getPassportTemplateStatistics: "/statistics/by/passport-template",
}

export class ReestrApi {
    constructor(private api = reestrApiClient) { }

    getOrgClassStatistics = async () => {
        const result: AxiosResponse<ReestrOrgClassStatisticsResponse> =
            await this.api.get(urls.getOrgClassStatistics);
        return result.data;
    };

    getPassportTemplateStatistics = async (params: { org_class: string }) => {
        const result: AxiosResponse<ReestrPassportTemplateStatisticsResponse> =
            await this.api.get(urls.getPassportTemplateStatistics, params);
        return result.data;
    };
}

export const reestrApi = new ReestrApi();