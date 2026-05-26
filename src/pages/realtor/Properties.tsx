import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useAuth } from "../../contexts/auth-context";
import { usePropertiesByRealtor } from "../../hooks/use-public-properties";
import { useVisitsByRealtor } from "../../hooks/use-visit-queries";
import { CalendarPlus, Eye, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatPrice(rentPrice?: number | null, salePrice?: number | null) {
  const price = salePrice ?? rentPrice;

  if (price == null) {
    return "Sob consulta";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

export default function RealtorProperties() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const { data: properties = [], isLoading } = usePropertiesByRealtor(user?.id);
  const { data: visits = [] } = useVisitsByRealtor(user?.id);

  const visitsByProperty = useMemo(
    () => visits.reduce<Record<string, number>>((acc, visit) => {
      acc[visit.propertyId] = (acc[visit.propertyId] ?? 0) + 1;
      return acc;
    }, {}),
    [visits],
  );

  const filteredProperties = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return properties;
    }

    return properties.filter((property) =>
      [property.title, property.city, property.neighborhood, property.status]
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [properties, search]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Meus Imóveis</h2>
          <p className="text-sm text-muted-foreground">Acompanhe os imóveis da sua carteira e crie visitas rapidamente.</p>
        </div>
        <div className="flex w-full gap-3 lg:w-auto">
          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por título, bairro ou cidade" className="pl-9" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Imóveis ativos</CardTitle>
            <CardDescription>Itens sob sua responsabilidade.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{properties.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disponíveis</CardTitle>
            <CardDescription>Prontos para novas negociações.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {properties.filter((property) => property.status === "AVAILABLE").length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visitas na semana</CardTitle>
            <CardDescription>Total agendado nesses imóveis.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{visits.length}</CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imóvel</TableHead>
              <TableHead>Cidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Visitas</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  Carregando imóveis...
                </TableCell>
              </TableRow>
            ) : filteredProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{property.city} - {property.neighborhood}</TableCell>
                <TableCell>{formatPrice(property.rentPrice, property.salePrice)}</TableCell>
                <TableCell>
                  <Badge variant={property.status === "AVAILABLE" ? "default" : "secondary"}>{property.status}</Badge>
                </TableCell>
                <TableCell>{visitsByProperty[property.id] ?? 0}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => navigate(`/imoveis/${property.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button onClick={() => navigate("/realtor/visits/create")}>
                      <CalendarPlus className="mr-2 h-4 w-4" />
                      Agendar visita
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && filteredProperties.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  Nenhum imóvel encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
