import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useRealtors } from "#hooks/use-users";
import { apiRequest } from "#lib/api";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../../types/database";

export default function IndexRealtors() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data: realtors, isLoading } = useRealtors();

  const filteredRealtors = useMemo(() => {
    const term = search.trim().toLowerCase();

    const onlyRealtors = (realtors ?? []).filter((realtor) => realtor.role === UserRole.REALTOR);

    if (!term) {
      return onlyRealtors;
    }

    return onlyRealtors.filter((realtor) =>
      [realtor.name, realtor.phone ?? "", realtor.email, realtor.role]
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [realtors, search]);

  async function handleDelete(id: string) {
    await apiRequest(`/admin/users/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold tracking-tight">Corretores</h2>
      <div className="space-y-4">
        <div className="flex mt-2">
          <Input className="w-60" onChange={(event) => setSearch(event.target.value)} placeholder="Buscar Corretor" />
          <Button className="ml-auto" onClick={() => navigate("/admin/realtors/create")}>Criar Corretor</Button>
        </div>
        <div className="border rounded-2xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Foto</TableHead>
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
                  <TableCell colSpan={6} className="text-center py-4">Carregando corretores...</TableCell>
                </TableRow>
              ) : filteredRealtors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">Nenhum corretor encontrado</TableCell>
                </TableRow>
              ) : (
                filteredRealtors.map((realtor) => (
                  <TableRow key={realtor.id}>
                    <TableCell className="flex items-center justify-center">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={realtor.avatar ?? undefined} />
                        <AvatarFallback>{realtor.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="text-center">{realtor.name}</TableCell>
                    <TableCell className="text-center">{realtor.phone ?? "-"}</TableCell>
                    <TableCell className="text-center">{realtor.email}</TableCell>
                    <TableCell className="text-center">{realtor.role}</TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Button size="icon" variant="outline" onClick={() => navigate(`/admin/realtors/${realtor.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => navigate(`/admin/realtors/edit/${realtor.id}`)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => void handleDelete(realtor.id)}>
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
    </div>
  );
}
