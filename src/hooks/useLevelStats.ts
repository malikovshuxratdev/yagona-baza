import { levelApi } from "@/api";
import { useQuery } from "./useQuery";

export const useLevelUserCountQuery = () => {
    return useQuery({
        queryKey: ['level-user-count'],
        queryFn: levelApi.getLevelUserCount,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};