import { useMemo, useState } from "react";
import { organizationApi } from "@/api";
import { useQuery, useMutation } from "./useQuery";
import { OrganizationListParams, OrganizationUpdatePayload } from "@/types";
import { useQueryClient } from "@tanstack/react-query";

export const useOrganizationListQuery = () => {
    const [params, setParams] = useState<OrganizationListParams>({
        page: 1,
        page_size: 20,
    });

    const query = useQuery({
        queryKey: ['organization-list', params],
        queryFn: () => organizationApi.organizationList({ ...params }),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });

    const resData = useMemo(() => query.data?.data?.items || [], [query.data]);

    const pagination = useMemo(
        () => ({
            page: query.data?.data.page || 1,
            pageSize: params.page_size,
            total: query.data?.data.total || 0,
            totalPages: Math.ceil(
                (query.data?.data.total || 0) / params.page_size
            ),
        }),
        [params, query.data]
    );

    const setPage = (page: number) => {
        setParams((prev) => ({ ...prev, page }));
    };

    const setPageSize = (page_size: number) => {
        setParams((prev) => ({ ...prev, page_size }));
    };

    const setName = (name: string | undefined) => {
        setParams((prev) => ({ ...prev, name, page: 1 }));
    };

    const setTin = (tin: string | undefined) => {
        setParams((prev) => ({ ...prev, tin, page: 1 }));
    };

    const setAdminId = (admin_id: number | undefined) => {
        setParams((prev) => ({ ...prev, admin_id, page: 1 }));
    };

    const setSupervisorId = (supervisor_id: number | undefined) => {
        setParams((prev) => ({ ...prev, supervisor_id, page: 1 }));
    };

    return {
        ...query,
        resData,
        pagination,
        setPage,
        setPageSize,
        setName,
        setTin,
        setAdminId,
        setSupervisorId,
    }
}

export const useOrganizationDetailQuery = (tin: string | undefined) => {
    const query = useQuery({
        queryKey: ['organization-detail', tin],
        queryFn: () => organizationApi.organizationDetail(tin!),
        enabled: !!tin,
        refetchOnWindowFocus: false,
    });

    return query;
}

export const useOrganizationFindQuery = (tin: string | undefined, options?: { enabled?: boolean }) => {
    const query = useQuery({
        queryKey: ['organization-find', tin],
        queryFn: () => organizationApi.organizationFind(tin!),
        enabled: options?.enabled !== undefined ? options.enabled && !!tin : !!tin,
        refetchOnWindowFocus: false,
    });

    return query;
}

export const useOrganizationUpdateMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: OrganizationUpdatePayload) => organizationApi.organizationUpdate(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['organization-list'] });
            queryClient.invalidateQueries({ queryKey: ['organization-detail'] });
            queryClient.invalidateQueries({ queryKey: ['organization-find'] });
        }
    });
}
