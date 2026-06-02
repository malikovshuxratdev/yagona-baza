import { AxiosResponse } from 'axios';
import { indexApiClient } from '@/api/baseClient';
import type {
    OrgListParams,
    OrgListResponse,
    OrgDetailResponse,
} from '@/types';

const urls = {
    getList: '/organization/list/',
    getDetail: (id: number) => `/organization/detail/${id}/`,
    getDetailByTin: (tin: string) => `/organization/detail/tin/${tin}/`,
};

export class OrganizationApi {
    constructor(private api = indexApiClient) {}

    getList = async (params: OrgListParams): Promise<OrgListResponse> => {
        const cleanParams: Record<string, string | number> = {
            page: params.page,
            page_size: params.page_size,
        };
        if (params.academic_type) cleanParams.academic_type = params.academic_type;
        if (params.name) cleanParams.name = params.name;
        if (params.tin) cleanParams.tin = params.tin;

        const result: AxiosResponse<{ data: OrgListResponse }> =
            await this.api.get(urls.getList, cleanParams);
        return result.data.data;
    };

    getDetail = async (id: number): Promise<OrgDetailResponse> => {
        const result: AxiosResponse<OrgDetailResponse> =
            await this.api.get(urls.getDetail(id));
        return result.data;
    };

    getDetailByTin = async (tin: string): Promise<OrgDetailResponse> => {
        const result: AxiosResponse<OrgDetailResponse> =
            await this.api.get(urls.getDetailByTin(tin));
        return result.data;
    };
}

export const organizationApi = new OrganizationApi();
