import { useState } from "react";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";

export type RelationOption = {
  id: string;
  label: string;
  description?: string;
};

type RelationSelectProps = {
  name: string;
  label: string;
  placeholder: string;
  searchPlaceholder: string;
  options: RelationOption[];
};

export function RelationSelect({ name, label, placeholder, searchPlaceholder, options }: RelationSelectProps) {
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const filteredOptions = options.filter((option) => {
    const searchValue = search.toLowerCase();

    return (
      option.label.toLowerCase().includes(searchValue) ||
      option.description?.toLowerCase().includes(searchValue) ||
      option.id.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} />
      <input id={name} name={name} type="hidden" value={selectedValue} />
      <Select value={selectedValue} onValueChange={setSelectedValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {filteredOptions.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.description ? `${option.label} - ${option.description}` : option.label}
            </SelectItem>
          ))}
          {filteredOptions.length === 0 && (
            <SelectItem value="empty" disabled>
              Nenhuma opção encontrada
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
