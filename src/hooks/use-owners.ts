import { useCrudResource, type UseCrudResourceOptions } from "./use-crud-resource";
import type { CreateOwnerInput, Owner, UpdateOwnerInput } from "../types/database";

export function useOwners(options?: UseCrudResourceOptions) {
  return useCrudResource<Owner, CreateOwnerInput, UpdateOwnerInput>("/admin/owners", options);
}
