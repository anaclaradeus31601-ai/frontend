
import fundo from "../../../src/assets/casafundodia.png"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "#components/ui/select";
import { InputGroup, InputGroupAddon, InputGroupInput } from "#components/ui/input-group";
import { MapPin, Search } from "lucide-react";
import PropertyGrid from "#components/property/property-grid";
import { useMemo, useState } from "react";
import { usePublicProperties } from "../../hooks/use-public-properties";

export default function Home() {
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
    <div className="relative">
      <div className="w-full h-full mb-20">
        <img className="w-full h-120 object-cover dark:brightness-50" src={fundo} alt="imagem de casa moderna" />
        {/* nav de pesquisa */}
        <div className="hidden shadow-md items-center md:flex lg:flex justify-center gap-4 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-20  rounded-2xl bg-card">
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Buscar por título" value={search} onChange={(event) => setSearch(event.target.value)} />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full max-w-48">
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
          <InputGroup className="max-w-60">
            <InputGroupInput placeholder="Endereço, bairro ou cidade" value={location} onChange={(event) => setLocation(event.target.value)} />
            <InputGroupAddon>
              <MapPin />
            </InputGroupAddon>
          </InputGroup>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full max-w-64">
                <SelectValue placeholder="Faixa de preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Preços</SelectLabel>
                  <SelectItem value="0-50000">de R$ 0 a R$ 50.000</SelectItem>
                  <SelectItem value="50000-100000">de R$ 50.000 a R$ 100.000</SelectItem>
                  <SelectItem value="100000-180000">de R$ 100.000 a R$ 180.000</SelectItem>
                  <SelectItem value="180000-300000">de R$ 180.000 a R$ 300.000</SelectItem>
                  <SelectItem value="300000-500000">de R$ 300.000 a R$ 500.000</SelectItem>
                  <SelectItem value="500000-1000000">de R$ 500.000 a R$ 1.000.000</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
        <div className="flex shadow-md items-center md:hidden lg:hidden justify-center gap-4 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-20  rounded-2xl bg-card">
          <InputGroup className="max-w-sm">
            <InputGroupInput placeholder="Buscar imóveis" value={search} onChange={(event) => setSearch(event.target.value)} />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup> 
        </div>
      </div>
      {isLoading ? (
        <div className="px-6 py-12 text-center text-muted-foreground">Carregando imóveis...</div>
      ) : isError ? (
        <div className="px-6 py-12 text-center text-destructive">Não foi possível carregar os imóveis.</div>
      ) : (
        <PropertyGrid properties={properties} />
      )}

    </div>
  );
}
