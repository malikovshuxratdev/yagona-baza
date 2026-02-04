import {
    useQuery as useQueryDefault,
    useQueries as useQueriesDefault,
    useMutation as useMutationDefault,
    useInfiniteQuery as useInfiniteQueryDefault,
    useQueryClient as useQueryClientDefault,
} from '@tanstack/react-query';

export const useQuery = useQueryDefault;
export const useInfiniteQuery = useInfiniteQueryDefault;
export const useQueries = useQueriesDefault;
export const useMutation = useMutationDefault;
export const useQueryClient = useQueryClientDefault;
