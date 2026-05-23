import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, type DefaultValues, type FieldValues, type Path, type Resolver, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { apiRequest, ApiError } from "../../lib/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { RelationSelect } from "#components/relation-select";

export interface FieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type: "text" | "email" | "password" | "date" | "datetime-local" | "number" | "tel" | "url" | "textarea" | "select" | "relation";
  placeholder?: string;
  required?: boolean;
  span?: "full" | "half";
  options?: { value: string; label: string }[];
  relationOptions?: { id: string; label: string; description?: string }[];
  relationLoading?: boolean;
  relationSearchPlaceholder?: string;
  rows?: number;
  defaultValue?: string | boolean | number;
}

export interface ResourceFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  title?: string;
  description?: string;
  backUrl?: string;
  submitUrl?: string;
  redirectUrl?: string;
  onSubmit?: (data: T) => Promise<void> | void;
  fields?: FieldConfig<T>[];
  submitLabel?: string;
  transformPayload?: (data: T) => unknown;
  method?: "POST" | "PUT" | "PATCH";
  initialValues?: Partial<T>;
}

export function ResourceForm<T extends FieldValues>({
  schema,
  title,
  description,
  backUrl,
  submitUrl,
  redirectUrl,
  onSubmit: customOnSubmit,
  fields,
  submitLabel = "Salvar",
  transformPayload,
  method = "POST",
  initialValues,
}: ResourceFormProps<T>) {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const fieldDefaultValues = (fields ?? []).reduce((acc, field) => {
    if (field.defaultValue !== undefined) {
      acc[field.name] = field.defaultValue as T[Path<T>];
    }

    return acc;
  }, {} as Partial<Record<Path<T>, T[Path<T>]>>);

  const defaultValues = {
    ...fieldDefaultValues,
    ...initialValues,
  } as DefaultValues<T>;

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema as never) as Resolver<T>,
    defaultValues,
  });

  const handleFormSubmit: SubmitHandler<T> = async (data) => {
    try {
      setServerError("");

      if (customOnSubmit) {
        await customOnSubmit(data);
        return;
      }

      if (!submitUrl) {
        throw new Error("submitUrl is required when onSubmit is not provided.");
      }

      const payload = transformPayload ? transformPayload(data) : data;

      await apiRequest(submitUrl, {
        method,
        body: JSON.stringify(payload),
      });

      if (redirectUrl) {
        navigate(redirectUrl);
      } else if (backUrl) {
        navigate(backUrl);
      } else {
        navigate(-1);
      }
    } catch (error: unknown) {
      if (error instanceof ApiError && error.status === 422) {
        const backendErrors = error.data?.errors as Record<string, string[] | string> | undefined;

        if (backendErrors) {
          Object.entries(backendErrors).forEach(([field, messages]) => {
            setError(field as Path<T>, {
              message: Array.isArray(messages) ? messages[0] : String(messages),
            });
          });
        }
      } else {
        setServerError(error instanceof Error ? error.message : "Erro ao salvar. Tente novamente.");
      }
    }
  };

  const renderField = (field: FieldConfig<T>) => {
    const error = errors[field.name];
    const errorMessage = error?.message as string | undefined;

    switch (field.type) {
      case "textarea":
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>
              {field.label} {field.required && "*"}
            </Label>
            <Textarea
              id={field.name}
              placeholder={field.placeholder}
              rows={field.rows || 4}
              {...register(field.name as Path<T>)}
              className={error ? "border-red-500" : ""}
            />
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          </div>
        );

      case "select":
        return (
          <div className="space-y-2" key={field.name}>
            <Label>{field.label} {field.required && "*"}</Label>
            <Controller
              name={field.name as Path<T>}
              control={control}
              render={({ field: controllerField }) => (
                <Select
                  value={(controllerField.value as string | undefined) ?? ""}
                  onValueChange={controllerField.onChange}
                >
                  <SelectTrigger className={error ? "border-red-500" : ""}>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          </div>
        );

      case "datetime-local":
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>
              {field.label} {field.required && "*"}
            </Label>
            <Input
              id={field.name}
              type="datetime-local"
              {...register(field.name as Path<T>)}
              className={error ? "border-red-500" : ""}
            />
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          </div>
        );

      case "relation":
        return (
          <div className="space-y-2" key={field.name}>
            <Label>{field.label} {field.required && "*"}</Label>
            <Controller
              name={field.name as Path<T>}
              control={control}
              render={({ field: controllerField }) => (
                <RelationSelect
                  value={(controllerField.value as string | undefined) ?? ""}
                  onChange={controllerField.onChange}
                  placeholder={`Selecione um ${field.label.toLowerCase()}`}
                  searchPlaceholder={field.relationSearchPlaceholder || "Buscar..."}
                  options={field.relationOptions || []}
                  loading={field.relationLoading}
                  error={errorMessage}
                />
              )}
            />
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          </div>
        );

      default:
        return (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>
              {field.label} {field.required && "*"}
            </Label>
            <Input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              {...register(
                field.name as Path<T>,
                field.type === "number"
                  ? {
                      setValueAs: (value) => {
                        if (value === "" || value === null || value === undefined) {
                          return undefined;
                        }

                        const numericValue = Number(value);
                        return Number.isNaN(numericValue) ? undefined : numericValue;
                      },
                    }
                  : undefined,
              )}
              className={error ? "border-red-500" : ""}
            />
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          </div>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => (backUrl ? navigate(backUrl) : navigate(-1))}>
        <ChevronLeft className="w-4 h-4 mr-1" />
        Voltar
      </Button>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {serverError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {fields?.map((field) => (
              <div key={field.name} className={field.span === "full" ? "md:col-span-2" : ""}>
                {renderField(field)}
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => (backUrl ? navigate(backUrl) : navigate(-1))}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}
