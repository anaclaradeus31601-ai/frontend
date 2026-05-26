import type { Property } from "../../types/database";
import PropertyCard from "./property-card";

interface PropertyGridProps {
  properties: Property[];
  emptyMessage?: string;
}

export default function PropertyGrid({
  properties,
  emptyMessage = "Nenhum imóvel encontrado.",
}: PropertyGridProps) {
  return (
    <div className="w-full px-6 mb-9 flex items-center justify-center">
      {properties.length === 0 ? (
        <div className="w-full rounded-2xl border border-dashed px-6 py-12 text-center text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        <div className="w-full place-items-center grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-12">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
