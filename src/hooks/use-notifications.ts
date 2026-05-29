import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../lib/api";
import type { Notification } from "../types/database";

export const myNotificationsQueryKey = ["notifications", "me"] as const;

export function useMyNotifications(enabled = true) {
  return useQuery({
    queryKey: myNotificationsQueryKey,
    queryFn: () => apiRequest<Notification[]>("/notification/me"),
    enabled,
    staleTime: 20_000,
    refetchInterval: enabled ? 30_000 : false,
  });
}
