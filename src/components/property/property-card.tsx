import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Separator } from "#components/ui/separator";
import type { Property } from "../../types/database";
import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
}

function formatPrice(property: Property) {
  const price = property.transactionType === "RENT" ? property.rentPrice : property.salePrice;

  if (price == null) {
    return "Sob consulta";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();
  const image = property.images[0] || "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="shadow-2xl bg-card flex flex-col justify-between rounded-2xl w-[90%] h-full min-w-70 min-h-95">
      <div className="relative overflow-hidden rounded-tl-2xl rounded-tr-2xl">
        {property.featured && (
          <Badge className="absolute top-8 left-4 bg-text-primary w-20 h-6 rounded-md">Destaque</Badge>
        )}
        <Button type="button" className="absolute top-6 right-4 rounded-full bg-foreground" size="icon">
          <Heart />
        </Button>
        <img className="w-full h-52 object-cover object-top" src={image} alt={property.title} />
      </div>

      <div className="px-4 py-3">
        <p className="text-h text-[10pt] flex items-center gap-2">
          <MapPin size={14} />
          {property.neighborhood}, {property.city}
        </p>
        <h2 className="text-md font-bold mt-2 tracking-tight">{property.title}</h2>
        <div className="w-full mt-2 justify-around flex flex-col text-sm gap-1">
          <p className="flex items-center gap-2"><BedDouble size={18} /> {property.bedrooms} quartos</p>
          <p className="flex items-center gap-2"><Bath size={18} /> {property.bathrooms} banheiros</p>
          <p className="flex items-center gap-2"><Ruler size={18} /> {property.area}m2</p>
        </div>
      </div>

      <Separator />

      <div className="flex px-4 py-3 items-center gap-3">
        <div>
          <p className="text-xl text-blue-900 dark:text-blue-500 font-bold">{formatPrice(property)}</p>
        </div>
        <Button
          type="button"
          className="ml-auto bg-blue-900 dark:bg-blue-500 hover:bg-blue-800"
          onClick={() => navigate(`/imoveis/${property.id}`)}
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
}
