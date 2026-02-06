import { useQuery } from "./useQuery";
import { akademApi } from "@/api";

export const useAkademStatsQuery = () => {
    return useQuery({
        queryKey: ['akadem-stats'],
        queryFn: () => akademApi.getAkademStatistics(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

export const useAkademWinnersQuery = () => {
    return useQuery({
        queryKey: ['akadem-winners'],
        queryFn: () => akademApi.getAkademWinners(),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};