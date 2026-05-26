import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Separator } from "#components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useContracts } from "#hooks/use-contracts";
import { Eye, Pencil, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatCurrency(value?: number | null) {
  if (value == null) {
    return "-";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function IndexContracts() {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { data: contracts, loading, remove } = useContracts();

  const filteredContracts = useMemo(() => {
    let nextContracts = contracts;

    if (search.trim()) {
      const term = search.trim().toLowerCase();
      nextContracts = nextContracts.filter((contract) =>
        [
          contract.client?.name,
          contract.property?.title,
          contract.documentUrl,
          contract.status,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(term)),
      );
    }

    if (status) {
      nextContracts = nextContracts.filter((contract) => contract.status === status);
    }

    return nextContracts;
  }, [contracts, search, status]);

  const totalValue = filteredContracts.reduce((total, contract) => total + (contract.saleValue ?? contract.rentValue ?? 0), 0);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Contratos</h2>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row flex-wrap gap-2">
          <Button onClick={() => setStatus("")}>Todos</Button>
          <Button onClick={() => setStatus("ACTIVE")} variant="success">Ativos</Button>
          <Button onClick={() => setStatus("EXPIRED")} variant="destructive">Vencidos</Button>
          <Button onClick={() => setStatus("CANCELLED")} variant="secondary">Cancelados</Button>
          <Button variant="ghost" className="ml-auto">Receita Total {formatCurrency(totalValue)}</Button>
        </div>
        <Separator className="mt-2" />
        <div className="flex gap-4 my-4">
          <div className="flex gap-4">
            <Input onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar" className="w-60" type="text" />
            <Button type="button" variant="default">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button className="ml-auto" onClick={() => navigate("/admin/contracts/create")}>Novo Contrato</Button>
        </div>

        <div className="border rounded-2xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Cliente</TableHead>
                <TableHead className="text-center">Imóvel</TableHead>
                <TableHead className="text-center">Data de Início</TableHead>
                <TableHead className="text-center">Data de Vencimento</TableHead>
                <TableHead className="text-center">Valor</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell className="text-center p-4" colSpan={7}>Carregando contratos...</TableCell></TableRow>
              ) : filteredContracts.length === 0 ? (
                <TableRow><TableCell className="text-center p-4" colSpan={7}>Nenhum contrato encontrado</TableCell></TableRow>
              ) : (
                filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="text-center">{contract.client?.name ?? contract.clientId}</TableCell>
                    <TableCell className="text-center">{contract.property?.title ?? contract.propertyId}</TableCell>
                    <TableCell className="text-center">{contract.startDate}</TableCell>
                    <TableCell className="text-center">{contract.endDate ?? "-"}</TableCell>
                    <TableCell className="text-center">{formatCurrency(contract.saleValue ?? contract.rentValue)}</TableCell>
                    <TableCell className="text-center">
                      <Badge>{contract.status}</Badge>
                    </TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Button size="icon" variant="outline" onClick={() => navigate(`/admin/contracts/${contract.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => navigate(`/admin/contracts/edit/${contract.id}`)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => void remove(contract.id)}>
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
