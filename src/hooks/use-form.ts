import { useForm as useReactHookForm, type UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function useForm<TSchema extends z.ZodType<any, any>>(
  schema: TSchema,
  defaultValues?: z.output<TSchema>
) {
  const formConfig: UseFormProps<z.output<TSchema>> = {
    resolver: zodResolver(schema) as any,
    defaultValues,
    mode: "onChange",
  };

  return useReactHookForm<z.output<TSchema>>(formConfig);
}