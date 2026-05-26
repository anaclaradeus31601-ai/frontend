// hooks/use-users.ts
import { UserRole, type QueryParams, type UserPublicData } from "../types/database";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/api";
import type { User } from "../types/database";
import { useCallback } from "react";

interface UseCrudResourceOptions {
  initialParams?: QueryParams;
}

// Hook genérico para usuários
export function useUsers(options?: UseCrudResourceOptions) {
  const fetchUsers = useCallback(async (params?: QueryParams) => {
    return apiRequest<UserPublicData[]>('/admin/users', {}, {
      ...options?.initialParams,
      ...params,
    });
  }, [options?.initialParams]);

  const getUserById = useCallback(async (id: string) => {
    return apiRequest<UserPublicData>(`/admin/users/${id}`);
  }, []);

  return { fetchUsers, getUserById };
}

export function useUserById(id?: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => apiRequest<User>(`/admin/users/${id}`),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

// Hooks específicos por role
export function useClients(params?: QueryParams) {
  return useQuery({
    queryKey: ["clients", params],
    queryFn: async () => {
      const users = await apiRequest<User[]>("/admin/users", {}, { ...params, role: "CLIENT" });
      return users.filter((user) => user.role === UserRole.CLIENT);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useRealtors(params?: QueryParams) {
  return useQuery({
    queryKey: ["realtors", params],
    queryFn: async () => {
      const users = await apiRequest<User[]>("/admin/users", {}, { ...params, role: "REALTOR" });
      return users.filter((user) => user.role === UserRole.REALTOR);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useAdmins(options?: UseCrudResourceOptions) {
  return useUsers({
    ...options,
    initialParams: {
      ...options?.initialParams,
      role: UserRole.ADMIN,
    },
  });
}
