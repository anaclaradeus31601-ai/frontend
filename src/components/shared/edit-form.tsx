import type { FieldValues } from "react-hook-form";
import { ResourceForm, type ResourceFormProps } from "./resource-form";

export interface EditFormProps<T extends FieldValues> extends Omit<ResourceFormProps<T>, "method"> {
  method?: "PUT" | "PATCH";
}

export function EditForm<T extends FieldValues>({
  submitLabel = "Salvar alterações",
  method = "PATCH",
  ...props
}: EditFormProps<T>) {
  return <ResourceForm {...props} submitLabel={submitLabel} method={method} />;
}
