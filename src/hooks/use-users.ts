import { useCrudResource, type UseCrudResourceOptions } from "./use-crud-resource";
import { UserRole, type CreateUserInput, type UpdateUserInput, type User } from "../types/database";

export function useUsers(options?: UseCrudResourceOptions) {
  return useCrudResource<User, CreateUserInput, UpdateUserInput>("/admin/users", options);
}

export function useClients(options?: UseCrudResourceOptions) {
  return useUsers({
    ...options,
    initialParams: {
      ...options?.initialParams,
      role: UserRole.CLIENT,
    },
  });
}

export function useRealtors(options?: UseCrudResourceOptions) {
  return useUsers({
    ...options,
    initialParams: {
      ...options?.initialParams,
      role: UserRole.REALTOR,
    },
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
