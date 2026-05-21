
import fundo from "../../../public/imagens/casafundodia.png"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "#components/ui/select";
import { InputGroup, InputGroupAddon, InputGroupInput } from "#components/ui/input-group";
import { MapPin, Search } from "lucide-react";
import PropertyCard from "#components/property/property-card";
import PropertyGrid from "#components/property/property-grid";

export default function Home() {



  return (
    <div className="relative">
      <div className="w-full h-full mb-20">
        <img className="w-full h-120 object-cover dark:brightness-50" src={fundo} alt="imagem de casa moderna" />
        

        {/* nav de pesquisa */}
        <div className="flex shadow-md items-center justify-center gap-4 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-20  rounded-2xl bg-card">
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
          </InputGroup>
          <Select>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Tipo de imóvel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de imóvel</SelectLabel>
                  <SelectItem value="residencial">Residencial</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          <InputGroup className="max-w-60">
            <InputGroupInput placeholder="Endereço, bairro ou cidade" />
            <InputGroupAddon>
              <MapPin />
            </InputGroupAddon>
            {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
          </InputGroup>
            <Select>
              <SelectTrigger className="w-full max-w-64">
                <SelectValue placeholder="Faixa de preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Preços</SelectLabel>
                  <SelectItem value="0-50">de R$ 0 a R$ 50.000</SelectItem>
                  <SelectItem value="50-100">de R$ 50.000 a R$ 100.000</SelectItem>
                  <SelectItem value="100-180">de R$ 100.000 a R$ 180.000</SelectItem>
                  <SelectItem value="180-300">de R$ 180.000 a R$ 300.000</SelectItem>
                  <SelectItem value="300-500">de R$ 300.000 a R$ 500.000</SelectItem>
                  <SelectItem value="500-1000">de R$ 500.000 a R$ 1.000.000</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
      </div>
        <PropertyGrid></PropertyGrid>

    </div>
  );
}