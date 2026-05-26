import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useVisits } from "#hooks/use-visits";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatDateTime(dateValue: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(dateValue));
}

export default function IndexVisits() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data: visits, loading, remove } = useVisits();

  const filteredVisits = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return visits;
    }

    return visits.filter((visit) =>
      [
        visit.client?.name,
        visit.property?.title,
        visit.realtor?.name,
        visit.status,
        visit.scheduledAt,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [search, visits]);

  return (
    <div className="p-6 max-w-full mx-auto space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Visitas</h2>
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Buscar por cliente, imóvel ou corretor"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-60"
        />
        <Button type="button">Buscar</Button>
        <Button className="ml-auto" onClick={() => navigate("/admin/visits/create")}>
          Criar Visita
        </Button>
      </div>
      <div className="overflow-x-auto border rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Imóvel</TableHead>
              <TableHead className="text-center">Cliente</TableHead>
              <TableHead className="text-center">Agendamento</TableHead>
              <TableHead className="text-center">Corretor</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-4">Carregando visitas...</TableCell>
              </TableRow>
            ) : filteredVisits.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-4">Nenhuma visita encontrada.</TableCell>
              </TableRow>
            ) : (
              filteredVisits.map((visit) => (
                <TableRow key={visit.id} className="border-t">
                  <TableCell className="text-center">{visit.property?.title ?? visit.propertyId}</TableCell>
                  <TableCell className="text-center">{visit.client?.name ?? visit.clientId}</TableCell>
                  <TableCell className="text-center">{formatDateTime(visit.scheduledAt)}</TableCell>
                  <TableCell className="text-center">{visit.realtor?.name ?? visit.realtorId}</TableCell>
                  <TableCell className="text-center">{visit.status}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => navigate(`/admin/visits/${visit.id}`)}>
                      <Eye />
                    </Button>
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => navigate(`/admin/visits/edit/${visit.id}`)}>
                      <Pencil />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => void remove(visit.id)}>
                      <Trash2 />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
