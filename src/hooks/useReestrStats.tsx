import { useMemo } from "react";
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