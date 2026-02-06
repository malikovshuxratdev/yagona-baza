import { useQuery } from "./useQuery";
import { internshipApi } from "@/api";

export const useInternshipStatsQuery = () => {
    return useQuery({
        queryKey: ['internship-stats'],
        queryFn: () => internshipApi.getInternshipStatistics(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

export const useInternshipRegionListQuery = (soato: number) => {
    return useQuery({
        queryKey: ['internship-region-list', soato],
        queryFn: () => internshipApi.getRegionList({ soato }),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};