import type { FormEvent } from "react";
import type { z } from "zod";

type FormValues = Record<string, string>;

function readFormValues(form: HTMLFormElement) {
  const values: FormValues = {};
  const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input[id], textarea[id]");

  fields.forEach((field) => {
    values[field.id] = field.value;
  });

  return values;
}

function getFirstError(error: z.ZodError) {
  return error.issues[0]?.message ?? "Revise os campos obrigatórios do formulário.";
}

export function createZodFormHandler<TSchema extends z.ZodType>(
  schema: TSchema,
  onValid?: (values: z.infer<TSchema>) => void,
) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = schema.safeParse(readFormValues(event.currentTarget));

    if (!result.success) {
      window.alert(getFirstError(result.error));
      return;
    }

    onValid?.(result.data);
  };
}
