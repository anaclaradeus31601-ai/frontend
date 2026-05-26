import { useCrudResource, type UseCrudResourceOptions } from "./use-crud-resource";
import type { Amenity, CreateAmenityInput, UpdateAmenityInput } from "../types/database";

export function useAmenities(options?: UseCrudResourceOptions) {
  return useCrudResource<Amenity, CreateAmenityInput, UpdateAmenityInput>("/amenity", {
    ...options,
    writeEndpoint: "/admin/amenity",
  });
}
