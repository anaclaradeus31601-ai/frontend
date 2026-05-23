import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import type { Visit } from "../types/database";

export function useVisitsByRealtor(realtorId?: string) {
  return useQuery({
    queryKey: ["visits", "realtor", realtorId],
    queryFn: () => apiRequest<Visit[]>(`/visit/realtor/${realtorId}`),
    enabled: Boolean(realtorId),
    staleTime: 60 * 1000,
  });
}

export function useVisitById(id?: string) {
  return useQuery({
    queryKey: ["visit", id],
    queryFn: () => apiRequest<Visit>(`/visit/${id}`),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
  });
}
