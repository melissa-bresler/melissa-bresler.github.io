import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "./apiClient";
import { GameDTO } from "../types/Game";
import { BlogPostDTO } from "../types/BlogPost";

export const useGetGamesQuery = () => {
  const { apiClient } = useApiClient();

  const getGames = async (): Promise<GameDTO[]> => {
    const response = await apiClient.get<GameDTO[]>("/games");
    return response.data;
  };

  const query = useQuery({
    queryKey: ["GetGames"],
    queryFn: getGames,
  });

  return query;
};

export const useGetGameBySlugQuery = (slug?: string) => {
  const { apiClient } = useApiClient();

  const getGame = async (): Promise<GameDTO> => {
    const response = await apiClient.get<GameDTO>(`/games/${slug}`);
    return response.data;
  };

  const query = useQuery({
    queryKey: ["GetGame", slug],
    queryFn: getGame,
    enabled: Boolean(slug),
  });

  return query;
};

export const useGetBlogPostsByGameIdQuery = (id?: string) => {
  const { apiClient } = useApiClient();

  const getBlogPosts = async (): Promise<BlogPostDTO[]> => {
    const response = await apiClient.get<BlogPostDTO[]>(`/blogPosts/${id}`);
    return response.data;
  };

  const query = useQuery({
    queryKey: ["GetBlogPosts", id],
    queryFn: getBlogPosts,
    enabled: Boolean(id),
  });

  return query;
};
