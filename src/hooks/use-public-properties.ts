import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import type { Property } from "../types/database";

export function usePropertiesByRealtor(realtorId?: string) {
  return useQuery({
    queryKey: ["properties", "realtor", realtorId],
    queryFn: () => apiRequest<Property[]>(`/property/realtor/${realtorId}`),
    enabled: Boolean(realtorId),
    staleTime: 60 * 1000,
  });
}
