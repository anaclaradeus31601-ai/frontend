import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import type { Favorite } from "../types/database";
import { useAuth } from "../contexts/auth-context";

export function useFavorites() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => apiRequest<Favorite[]>("/favorites"),
    enabled: isAuthenticated,
    staleTime: 30 * 1000,
  });
}

export function useFavoritePropertyIds() {
  const favoritesQuery = useFavorites();

  return {
    ...favoritesQuery,
    favoriteIds: new Set((favoritesQuery.data ?? []).map((favorite) => favorite.propertyId)),
  };
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      propertyId,
      isFavorite,
    }: {
      propertyId: string;
      isFavorite: boolean;
    }) => {
      if (isFavorite) {
        await apiRequest(`/favorites/${propertyId}`, {
          method: "DELETE",
        });
        return null;
      }

      return apiRequest<Favorite>(`/favorites/${propertyId}`, {
        method: "POST",
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
