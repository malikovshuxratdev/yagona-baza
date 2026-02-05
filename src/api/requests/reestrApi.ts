import { AxiosResponse } from "axios";
import { reestrApiClient } from "@/api/baseClient";
import {
    ReestrOrgClassStatisticsResponse,
    ReestrPassportTemplateStatisticsResponse,
    ReestrRegionStatisticsResponse,
    ReestrOrganizationListResponse,
    ReestrOrganizationDetailResponse
} from "@/types";

const urls = {
    getOrgClassStatistics: '/statistics/by/org-class',
    getPassportTemplateStatistics: "/statistics/by/passport-template",
    getRegionStatistics: "/statistics/by/region",
    getReestrOrganizationList: "/statistics/organizations/",
    getReestrOrganizationDetail: (id: number) => `/statistics/organizations/${id}`,
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

    getRegionStatistics = async (params: { soato: number }) => {
        const result: AxiosResponse<ReestrRegionStatisticsResponse> =
            await this.api.get(urls.getRegionStatistics, params);
        return result.data;
    };

    getReestrOrganizationList = async (params: { name_search: string, page: number, page_size: number, tin_search: string }) => {
        const result: AxiosResponse<ReestrOrganizationListResponse> =
            await this.api.get(urls.getReestrOrganizationList, params);
        return result.data;
    };

    getReestrOrganizationDetail = async (id: number) => {
        const result: AxiosResponse<ReestrOrganizationDetailResponse> =
            await this.api.get(urls.getReestrOrganizationDetail(id));
        return result.data;
    };

}

export const reestrApi = new ReestrApi();