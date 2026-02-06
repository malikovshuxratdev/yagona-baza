import { useQuery } from "./useQuery";
import { academApi } from "@/api";

export const useAcademStatsQuery = () => {
    return useQuery({
        queryKey: ['academ-stats'],
        queryFn: () => academApi.getAcademStatistics(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

export const useAcademWinnersQuery = () => {
    return useQuery({
        queryKey: ['academ-winners'],
        queryFn: () => academApi.getAcademWinners(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};