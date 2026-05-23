import type { FieldValues } from "react-hook-form";
import { ResourceForm, type ResourceFormProps } from "./resource-form";

export type CreateFormProps<T extends FieldValues> = Omit<ResourceFormProps<T>, "method">;

export function CreateForm<T extends FieldValues>(props: CreateFormProps<T>) {
  return <ResourceForm {...props} method="POST" />;
}
