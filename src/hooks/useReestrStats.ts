import { useMemo, useState } from "react";
import { useQuery } from "./useQuery";
import { reestrApi } from "@/api";

export const useReestrOrgClassStatisticsQuery = () => {
    return useQuery({
        queryKey: ['reestr-org-class-statistics'],
        queryFn: () => reestrApi.getOrgClassStatistics(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
}

export const useReestrPassportTemplateStatisticsQuery = (org_class?: string | undefined) => {
    const params = useMemo(() => ({ org_class: org_class || undefined }), [org_class]);
    return useQuery({
        queryKey: ['reestr-passport-template-statistics', params],
        queryFn: () => reestrApi.getPassportTemplateStatistics(params as { org_class: string }),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
}

export const useReestrRegionStatisticsQuery = (soato: number) => {
    return useQuery({
        queryKey: ['reestr-region-statistics', soato],
        queryFn: () => reestrApi.getRegionStatistics({ soato }),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
}

const defaultOrgListParams = {
    name_search: '',
    page: 1,
    page_size: 20,
    tin_search: '',
} as const;

export type ReestrOrganizationListParams = {
    name_search: string;
    page: number;
    page_size: number;
    tin_search: string;
};

export const useReestrOrganizationListQuery = () => {
    const [params, setParams] = useState<ReestrOrganizationListParams>({
        ...defaultOrgListParams,
    });

    const query = useQuery({
        queryKey: ['reestr-organization-list', params],
        queryFn: () => reestrApi.getReestrOrganizationList(params),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const resData = useMemo(() => query.data?.data ?? [], [query.data]);

    const pagination = useMemo(
        () => ({
            page: query.data?.page ?? params.page,
            pageSize: query.data?.pageSize ?? params.page_size,
            total: query.data?.total ?? 0,
            totalPages: query.data?.pagesCount ?? Math.ceil((query.data?.total ?? 0) / params.page_size),
        }),
        [params.page, params.page_size, query.data]
    );

    const setPage = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
    };

    const setPageSize = (page_size: number) => {
        setParams((prev) => ({ ...prev, page_size, page: 1 }));
    };

    const setNameSearch = (name_search: string) => {
        setParams((prev) => ({ ...prev, name_search, page: 1 }));
    };

    const setTinSearch = (tin_search: string) => {
        setParams((prev) => ({ ...prev, tin_search, page: 1 }));
    };

    return {
        ...query,
        resData,
        pagination,
        nameSearch: params.name_search,
        tinSearch: params.tin_search,
        setPage,
        setPageSize,
        setNameSearch,
        setTinSearch,
    };
};

export const useReestrOrganizationDetailQuery = (id: number) => {
    return useQuery({
        queryKey: ['reestr-organization-detail', id],
        queryFn: () => reestrApi.getReestrOrganizationDetail(id),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};