import { useMemo, useState } from 'react';
import { useQuery } from './useQuery';
import { organizationApi } from '@/api';
import type { AcademicType, OrgListParams } from '@/types';

const defaultParams: OrgListParams = {
    page: 1,
    page_size: 20,
    academic_type: '',
    name: '',
    tin: '',
};

export const useOrganizationListQuery = () => {
    const [params, setParams] = useState<OrgListParams>({ ...defaultParams });

    const query = useQuery({
        queryKey: ['organization-list', params],
        queryFn: () => organizationApi.getList(params),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const items = useMemo(() => query.data?.items ?? [], [query.data]);

    const pagination = useMemo(
        () => ({
            page: query.data?.page ?? params.page,
            pageSize: query.data?.page_size ?? params.page_size,
            total: query.data?.count ?? 0,
            totalPages: query.data?.total_pages ?? 0,
        }),
        [params.page, params.page_size, query.data]
    );

    const setPage = (page: number) => setParams((p) => ({ ...p, page }));
    const setPageSize = (page_size: number) => setParams((p) => ({ ...p, page_size, page: 1 }));
    const setName = (name: string) => setParams((p) => ({ ...p, name, page: 1 }));
    const setTin = (tin: string) => setParams((p) => ({ ...p, tin, page: 1 }));
    const setAcademicType = (academic_type: AcademicType | '') =>
        setParams((p) => ({ ...p, academic_type, page: 1 }));

    return {
        ...query,
        items,
        pagination,
        params,
        setPage,
        setPageSize,
        setName,
        setTin,
        setAcademicType,
    };
};

export const useOrganizationDetailQuery = (id: number) => {
    return useQuery({
        queryKey: ['organization-detail', id],
        queryFn: () => organizationApi.getDetail(id),
        enabled: !!id,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};
