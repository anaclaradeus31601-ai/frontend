import { useCrudResource, type UseCrudResourceOptions } from "./use-crud-resource";
import type { CreateSessionInput, Session, UpdateSessionInput } from "../types/database";

export function useSessions(options?: UseCrudResourceOptions) {
  return useCrudResource<Session, CreateSessionInput, UpdateSessionInput>("/admin/sessions", options);
}
