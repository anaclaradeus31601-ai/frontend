import { useForm as useReactHookForm, type DefaultValues, type FieldValues, type Resolver, type UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function useForm<TValues extends FieldValues>(
  schema: z.ZodType<TValues>,
  defaultValues?: DefaultValues<TValues>
) {
  const formConfig: UseFormProps<TValues> = {
    resolver: zodResolver(schema as never) as Resolver<TValues>,
    defaultValues,
    mode: "onChange",
  };

  return useReactHookForm<TValues>(formConfig);
}
