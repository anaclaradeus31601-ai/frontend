import PropertyGrid from "#components/property/property-grid";
import { PublicPageShell, PublicSectionHeading } from "#components/marketing/public-page-shell";
import { Card, CardContent } from "#components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "#components/ui/input-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "#components/ui/select";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { usePublicProperties } from "../../hooks/use-public-properties";

export default function PropertiesCatalog() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (location.trim()) {
      params.location = location.trim();
    }

    if (type) {
      params.type = type;
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-");
      params.minPrice = minPrice;
      params.maxPrice = maxPrice;
    }

    return params;
  }, [location, priceRange, search, type]);

  const { data: properties = [], isLoading, isError } = usePublicProperties(queryParams);

  return (
    <PublicPageShell
      eyebrow="Catalogo"
      title="Explore imóveis prontos para virar negócio"
      description="Uma vitrine dedicada para busca, comparação e descoberta. Filtre por tipo, cidade e faixa de preço sem depender da home."
    >
      <Card className="border-0 bg-slate-950 text-white shadow-2xl ring-0">
        <CardContent className="grid gap-4 pt-6 md:grid-cols-2 xl:grid-cols-4">
          <InputGroup className="max-w-full bg-white/10">
            <InputGroupInput
              placeholder="Buscar por título"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="border-0 bg-transparent text-white placeholder:text-slate-300"
            />
            <InputGroupAddon className="border-0 bg-transparent text-slate-200">
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <InputGroup className="max-w-full bg-white/10">
            <InputGroupInput
              placeholder="Cidade, bairro ou endereço"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              className="border-0 bg-transparent text-white placeholder:text-slate-300"
            />
            <InputGroupAddon className="border-0 bg-transparent text-slate-200">
              <MapPin />
            </InputGroupAddon>
          </InputGroup>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="h-11 w-full border-white/10 bg-white/10 text-white">
              <SelectValue placeholder="Tipo de imóvel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo de imóvel</SelectLabel>
                <SelectItem value="RESIDENTIAL">Residencial</SelectItem>
                <SelectItem value="COMMERCIAL">Comercial</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="h-11 w-full border-white/10 bg-white/10 text-white">
              <SelectValue placeholder="Faixa de preço" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Preços</SelectLabel>
                <SelectItem value="0-50000">R$ 0 a R$ 50.000</SelectItem>
                <SelectItem value="50000-100000">R$ 50.000 a R$ 100.000</SelectItem>
                <SelectItem value="100000-180000">R$ 100.000 a R$ 180.000</SelectItem>
                <SelectItem value="180000-300000">R$ 180.000 a R$ 300.000</SelectItem>
                <SelectItem value="300000-500000">R$ 300.000 a R$ 500.000</SelectItem>
                <SelectItem value="500000-1000000">R$ 500.000 a R$ 1.000.000</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <PublicSectionHeading
          eyebrow="Busca"
          title="Resultados para compra, aluguel e descoberta"
          description="A listagem usa os mesmos dados públicos da home, com uma apresentação mais orientada à comparação e à tomada de decisão."
        />

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          {isLoading ? "Atualizando resultados..." : `${properties.length} imóvel(is) disponível(is)`}
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-dashed px-6 py-12 text-center text-muted-foreground">
            Carregando imóveis...
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center text-destructive">
            Não foi possível carregar o catálogo agora.
          </div>
        ) : (
          <PropertyGrid
            properties={properties}
            emptyMessage="Nenhum imóvel combina com os filtros atuais. Tente abrir a busca ou mudar a faixa de preço."
          />
        )}
      </section>
    </PublicPageShell>
  );
}
