import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { CalendarPlus, Eye, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const realtorProperties = [
  {
    id: "prop-101",
    title: "Apartamento Vista Mar",
    city: "Florianópolis",
    neighborhood: "Jurerê",
    price: "R$ 1.250.000",
    status: "Disponível",
    visitsThisWeek: 3,
  },
  {
    id: "prop-102",
    title: "Casa com Área Gourmet",
    city: "São José",
    neighborhood: "Campinas",
    price: "R$ 890.000",
    status: "Pendente",
    visitsThisWeek: 1,
  },
  {
    id: "prop-103",
    title: "Sala Comercial Central",
    city: "Florianópolis",
    neighborhood: "Centro",
    price: "R$ 4.500/mês",
    status: "Disponível",
    visitsThisWeek: 2,
  },
];

export default function RealtorProperties() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredProperties = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return realtorProperties;
    }

    return realtorProperties.filter((property) =>
      [property.title, property.city, property.neighborhood, property.status]
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [search]);

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
          <CardContent className="text-3xl font-bold">{realtorProperties.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disponíveis</CardTitle>
            <CardDescription>Prontos para novas negociações.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {realtorProperties.filter((property) => property.status === "Disponível").length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visitas na semana</CardTitle>
            <CardDescription>Total agendado nesses imóveis.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {realtorProperties.reduce((total, property) => total + property.visitsThisWeek, 0)}
          </CardContent>
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
            {filteredProperties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{property.city} - {property.neighborhood}</TableCell>
                <TableCell>{property.price}</TableCell>
                <TableCell>
                  <Badge variant={property.status === "Disponível" ? "default" : "secondary"}>{property.status}</Badge>
                </TableCell>
                <TableCell>{property.visitsThisWeek}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => navigate("/show-property")}>
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
            {filteredProperties.length === 0 && (
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
