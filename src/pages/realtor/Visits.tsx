import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { CalendarPlus, Pencil, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { useVisitsByRealtor } from "../../hooks/use-visit-queries";
import { usePropertiesByRealtor } from "../../hooks/use-public-properties";

function formatScheduledAt(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function mapVisitStatus(status: string) {
  const statusMap: Record<string, string> = {
    SCHEDULED: "Agendada",
    COMPLETED: "Concluída",
    CANCELLED: "Cancelada",
    NO_SHOW: "Não compareceu",
  };

  return statusMap[status] ?? status;
}

export default function RealtorVisits() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { user, loading: authLoading } = useAuth();
  const { data: visits = [], isLoading: loadingVisits } = useVisitsByRealtor(user?.id);
  const { data: properties = [] } = usePropertiesByRealtor(user?.id);

  const propertyMap = useMemo(
    () => new Map(properties.map((property) => [property.id, property.title])),
    [properties],
  );

  const normalizedVisits = useMemo(
    () =>
      visits.map((visit) => ({
        id: visit.id,
        property: propertyMap.get(visit.propertyId) ?? visit.propertyId,
        client: visit.clientId,
        scheduledAt: formatScheduledAt(visit.scheduledAt),
        status: mapVisitStatus(visit.status),
      })),
    [propertyMap, visits],
  );

  const filteredVisits = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return normalizedVisits;
    }

    return normalizedVisits.filter((visit) =>
      [visit.property, visit.client, visit.status, visit.scheduledAt]
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [normalizedVisits, search]);

  if (authLoading || loadingVisits) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Minhas Visitas</h2>
          <p className="text-sm text-muted-foreground">Crie, ajuste e acompanhe as visitas da sua agenda.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por imóvel, cliente ou status" className="pl-9" />
          </div>
          <Button onClick={() => navigate("/realtor/visits/create")}>
            <CalendarPlus className="mr-2 h-4 w-4" />
            Nova visita
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total de visitas</CardTitle>
            <CardDescription>Agenda cadastrada.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{normalizedVisits.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pendentes</CardTitle>
            <CardDescription>Agendadas ou confirmadas.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {normalizedVisits.filter((visit) => visit.status !== "Concluída").length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Concluídas</CardTitle>
            <CardDescription>Já realizadas.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {normalizedVisits.filter((visit) => visit.status === "Concluída").length}
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imóvel</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data e hora</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVisits.map((visit) => (
              <TableRow key={visit.id}>
                <TableCell className="font-medium">{visit.property}</TableCell>
                <TableCell>{visit.client}</TableCell>
                <TableCell>{visit.scheduledAt}</TableCell>
                <TableCell>
                  <Badge variant={visit.status === "Concluída" ? "secondary" : "default"}>{visit.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" onClick={() => navigate(`/realtor/visits/edit/${visit.id}`)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredVisits.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  Nenhuma visita encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
