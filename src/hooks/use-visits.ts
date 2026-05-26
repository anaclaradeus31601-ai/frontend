import { useCrudResource, type UseCrudResourceOptions } from "./use-crud-resource";
import type { CreateVisitInput, UpdateVisitInput, Visit } from "../types/database";

export function useVisits(options?: UseCrudResourceOptions) {
  return useCrudResource<Visit, CreateVisitInput, UpdateVisitInput>("/visit", {
    ...options,
    writeEndpoint: "/admin/visit",
  });
}
