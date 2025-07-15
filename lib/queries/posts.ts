import { queryOptions } from "@tanstack/react-query";
import { fetchPostById, fetchPosts } from "../apis/posts";

export const postQueries = {
    all: () => ['post'] as const,
  
    lists: () => [...postQueries.all(), 'list'] as const,
  
    list: () =>
      queryOptions({
        queryKey: postQueries.lists(),
        queryFn: fetchPosts,
        staleTime: 1000 * 10,
        gcTime: 1000 * 20,
      }),
  
    details: () => [...postQueries.all(), 'detail'] as const,
  
    detail: (id: number) =>
      queryOptions({
        queryKey: [...postQueries.details(), id] as const,
        queryFn: () => fetchPostById(id),
        staleTime: 1000 * 10,
        gcTime: 1000 * 20,
      }),
  };