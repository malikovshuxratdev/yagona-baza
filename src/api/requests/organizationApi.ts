import { AxiosResponse } from "axios";
import { baseApiClient } from "../baseClient";
import {
    OrganizationListParams,
    OrganizationListResponse,
    OrganizationDetailResponse,
    OrganizationUpdatePayload,
    OrganizationUpdateResponse
} from "@/types";

const urls = {
    organizationList: '/organization/list',
    organizationDetail: (tin: string) => `/organization/${tin}/detail`,
    organizationFind: '/organization/find',
    organizationUpdate: '/organization/update',
}

export class OrganizationApi {
    constructor(private api = baseApiClient) { }

    organizationList = async (params: OrganizationListParams): Promise<OrganizationListResponse> => {
        const result: AxiosResponse<OrganizationListResponse> =
            await this.api.get(urls.organizationList, params);
        return result.data;
    }

    organizationDetail = async (tin: string): Promise<OrganizationDetailResponse> => {
        const result: AxiosResponse<OrganizationDetailResponse> =
            await this.api.get(urls.organizationDetail(tin));
        return result.data;
    }

    organizationFind = async (tin: string): Promise<OrganizationDetailResponse> => {
        const result: AxiosResponse<OrganizationDetailResponse> =
            await this.api.get(urls.organizationFind, { tin });
        return result.data;
    }

    organizationUpdate = async (payload: OrganizationUpdatePayload): Promise<OrganizationUpdateResponse> => {
        const result: AxiosResponse<OrganizationUpdateResponse> =
            await this.api.post(urls.organizationUpdate, payload);
        return result.data;
    }
}

export const organizationApi = new OrganizationApi();

