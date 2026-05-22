import { useCrudResource, type UseCrudResourceOptions } from "./use-crud-resource";
import type {
  CreatePropertyAmenityInput,
  PropertyAmenity,
  UpdatePropertyAmenityInput,
} from "../types/database";

export function usePropertyAmenities(options?: UseCrudResourceOptions) {
  return useCrudResource<PropertyAmenity, CreatePropertyAmenityInput, UpdatePropertyAmenityInput>(
    "/admin/property-amenities",
    options,
  );
}
