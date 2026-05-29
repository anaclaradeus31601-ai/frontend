import {
  ArrowLeft,
  Bath,
  Bed,
  Car,
  Heart,
  MapPin,
  Maximize,
  Share2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Card, CardContent } from "#components/ui/card";
import { useState } from "react";
import { useAuth } from "../../contexts/auth-context";
import { useFavoritePropertyIds, useToggleFavorite } from "../../hooks/use-favorites";
import { cn } from "../../lib/utils";

const property = {
  id: "mock-property-show-page",
  title: "Casa moderna em condomínio",
  location: "Alphaville, São Paulo - SP",
  price: "R$ 2.350.000",
  type: "Casa",
  status: "À venda",
  description:
    "Imóvel moderno, espaçoso e bem localizado, ideal para quem busca conforto, segurança e praticidade. Possui ambientes integrados, ótima iluminação natural e acabamento de alto padrão.",
  images: [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
  ],
  details: {
    bedrooms: 4,
    bathrooms: 3,
    garages: 2,
    area: "360 m²",
  },
};


export default function ShowProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { favoriteIds } = useFavoritePropertyIds();
  const toggleFavorite = useToggleFavorite();
  const [image, setImage] = useState(property.images[0]);
  const propertyId = id ?? property.id;
  const isFavorite = favoriteIds.has(propertyId);

  async function handleFavoriteClick() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    await toggleFavorite.mutateAsync({
      propertyId,
      isFavorite,
    });
  }

  return (
    <main className="min-h-screen bg-background px-4 pb-10 text-foreground md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex gap-4 justify-between">
          <Button variant="ghost" asChild className="w-fit px-0">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Voltar para imóveis
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 size={18} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleFavoriteClick}
              disabled={toggleFavorite.isPending}
            >
              <Heart size={18} className={cn(isFavorite ? "fill-current text-red-500" : "")} />
            </Button>
          </div>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <Card className="overflow-hidden p-0">
              <div className="relative h-70 sm:h-95 lg:h-155">
                <img
                  src={image}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute left-4 top-4 flex gap-2">
                  <Badge>{property.status}</Badge>
                  <Badge variant="secondary">{property.type}</Badge>
                </div>
              </div>

              <CardContent className="grid grid-cols-4 gap-3 p-4">
                {property.images.map((image, index) => (
                  <Link to="#" key={image} onClick={() => setImage(image)} className="cursor-pointer">
                    <img
                      key={image}
                      src={image}
                      alt={`Imagem ${index + 1} do imóvel`}
                      className="h-20 w-full rounded-lg object-cover sm:h-24"
                    />
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                      {property.title}
                    </h1>

                    <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                      <MapPin size={18} />
                      {property.location}
                    </p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-sm text-muted-foreground">Valor</p>
                    <p className="text-3xl font-semibold text-primary">
                      {property.price}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <InfoItem icon={Bed} label="Quartos" value={property.details.bedrooms} />
                  <InfoItem icon={Bath} label="Banheiros" value={property.details.bathrooms} />
                  <InfoItem icon={Car} label="Garagens" value={property.details.garages} />
                  <InfoItem icon={Maximize} label="Área" value={property.details.area} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold">Descrição</h2>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {property.description}
                </p>
              </CardContent>
            </Card>


            <div className=" h-64 w-full overflow-hidden rounded-lg">
              <iframe
                title="Localização do imóvel"
                src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <aside className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Resumo do imóvel</h2>

                <div className="mt-5 space-y-4">
                  <Detail label="Tipo" value={property.type} />
                  <Detail label="Status" value={property.status} />
                  <Detail label="Área" value={property.details.area} />
                  <Detail label="Quartos" value={`${property.details.bedrooms}`} />
                  <Detail label="Banheiros" value={`${property.details.bathrooms}`} />
                  <Detail label="Garagens" value={`${property.details.garages}`} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">Tenho interesse</h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  Entre em contato para visitar ou saber mais detalhes sobre este imóvel.
                </p>

                <div className="mt-5 space-y-3">
                  <Button asChild className="w-full">
                    <a target="_blank" href={`https://wa.me/5516992794743?text=${encodeURIComponent(`Olá, tenho interesse no imóvel "${property.title}". Gostaria de agendar uma visita.`)}`}>Agendar visita</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a target="_blank" href={`https://wa.me/5516992794743?text=${encodeURIComponent(`Olá, tenho interesse no imóvel "${property.title}". Gostaria de saber mais detalhes e agendar uma visita.`)
                      }`}>Enviar mensagem</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  );
}

type InfoItemProps = {
  icon: React.ElementType;
  label: string;
  value: string | number;
};

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
        <Icon size={21} />
      </div>

      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
