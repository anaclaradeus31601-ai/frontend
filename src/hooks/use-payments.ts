import { useCrudResource, type UseCrudResourceOptions } from "./use-crud-resource";
import type { CreatePaymentInput, Payment, UpdatePaymentInput } from "../types/database";

export function usePayments(options?: UseCrudResourceOptions) {
  return useCrudResource<Payment, CreatePaymentInput, UpdatePaymentInput>("/admin/payment", options);
}
