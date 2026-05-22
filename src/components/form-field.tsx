import { Controller, type Control, FieldValues, Path } from "react-hook-form";
import { Input } from "#components/ui/input";
import { Textarea } from "#components/ui/textarea";
import { Label } from "#components/ui/label";
import { Select } from "#components/ui/select";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "date" | "datetime-local";
  required?: boolean;
  error?: string;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required,
  error,
}: FormFieldProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={String(name)}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            id={String(name)}
            type={type}
            placeholder={placeholder}
            {...field}
            className={error ? "border-red-500 focus:ring-red-500/20" : ""}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface FormTextAreaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
}

export function FormTextArea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required,
  error,
  rows = 4,
}: FormTextAreaProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={String(name)}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Textarea
            id={String(name)}
            placeholder={placeholder}
            rows={rows}
            {...field}
            className={error ? "border-red-500 focus:ring-red-500/20" : ""}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  required,
  error,
}: FormSelectProps<T>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={String(name)}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            id={String(name)}
            {...field}
            className={error ? "border-red-500 focus:ring-red-500/20" : ""}
          >
            <option value="">Selecione uma opção</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
