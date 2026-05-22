import { useCrudResource, type UseCrudResourceOptions } from "./use-crud-resource";
import type { CreatePropertyInput, Property, UpdatePropertyInput } from "../types/database";

export function useProperties(options?: UseCrudResourceOptions) {
  return useCrudResource<Property, CreatePropertyInput, UpdatePropertyInput>("/admin/properties", options);
}
