import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useOwners } from "#hooks/use-owners";
import { Eye, Pencil, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IndexOwners() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { data: owners, loading, remove } = useOwners();

  const filteredOwners = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return owners;
    }

    return owners.filter((owner) =>
      [owner.name, owner.phone, owner.email, owner.cpfCnpj]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [owners, searchTerm]);

  return (
    <div className="p-6 max-w-full mx-auto space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Proprietários</h2>
      <div className="flex gap-4">
        <Input onChange={(event) => setSearchTerm(event.target.value)} type="text" className="w-60" placeholder="Buscar proprietário..." />
        <Button type="button"><Search /></Button>
        <Button className="ml-auto" onClick={() => navigate("/admin/owners/create")}>Criar Proprietário</Button>
      </div>

      <div className="border rounded-2xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Telefone</TableHead>
              <TableHead className="text-center">E-mail</TableHead>
              <TableHead className="text-center">CPF/CNPJ</TableHead>
              <TableHead className="w-25 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4">Carregando proprietários...</TableCell>
              </TableRow>
            ) : filteredOwners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center p-4">Nenhum proprietário encontrado.</TableCell>
              </TableRow>
            ) : (
              filteredOwners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell className="font-medium text-center">{owner.name}</TableCell>
                  <TableCell className="font-medium text-center">{owner.phone}</TableCell>
                  <TableCell className="font-medium text-center">{owner.email}</TableCell>
                  <TableCell className="font-medium text-center">{owner.cpfCnpj}</TableCell>
                  <TableCell className="flex justify-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => navigate(`/admin/owners/${owner.id}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => navigate(`/admin/owners/edit/${owner.id}`)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" onClick={() => void remove(owner.id)}>
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
