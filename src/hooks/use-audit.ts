import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import type { QueryParams } from "../types/database";
import type { AuditLog } from "../types/database";

export function useAuditLogs(params?: QueryParams) {
  return useQuery({
    queryKey: ["audit", params],
    queryFn: () => apiRequest<AuditLog[]>("/admin/audit", undefined, params),
    staleTime: 30 * 1000,
  });
}
