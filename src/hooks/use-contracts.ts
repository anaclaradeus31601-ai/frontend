import { useCrudResource, type UseCrudResourceOptions } from "./use-crud-resource";
import type { Contract, CreateContractInput, UpdateContractInput } from "../types/database";

export function useContracts(options?: UseCrudResourceOptions) {
  return useCrudResource<Contract, CreateContractInput, UpdateContractInput>("/admin/contracts", options);
}
