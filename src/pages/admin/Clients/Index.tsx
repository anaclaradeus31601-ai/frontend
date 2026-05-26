import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useClients } from "#hooks/use-users";
import { apiRequest } from "#lib/api";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../../types/database";

export default function IndexClients() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data: clients, isLoading } = useClients();

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase();

    const onlyClients = (clients ?? []).filter((client) => client.role === UserRole.CLIENT);

    if (!term) {
      return onlyClients;
    }

    return onlyClients.filter((client) =>
      [client.name, client.email, client.phone ?? "", client.role]
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [clients, search]);

  async function handleDelete(id: string) {
    await apiRequest(`/admin/users/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Clientes</h2>
      <div className="flex mt-2 gap-4">
        <Input className="w-60" onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente" />
        <Button className="ml-auto" onClick={() => navigate("/admin/clients/create")}>Criar Cliente</Button>
      </div>
      <div className="border rounded-2xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Telefone</TableHead>
              <TableHead className="text-center">E-mail</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">Carregando clientes...</TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">Nenhum cliente encontrado.</TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="text-center">{client.name}</TableCell>
                  <TableCell className="text-center">{client.phone ?? "-"}</TableCell>
                  <TableCell className="text-center">{client.email}</TableCell>
                  <TableCell className="text-center">{client.role}</TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => navigate(`/admin/clients/${client.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => navigate(`/admin/clients/edit/${client.id}`)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => void handleDelete(client.id)}>
                      <Trash2 className="h-4 w-4" />
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
