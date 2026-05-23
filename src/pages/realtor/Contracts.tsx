import { Badge } from "#components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";

const contracts = [
  {
    id: "contract-1",
    client: "Marina Souza",
    property: "Apartamento Vista Mar",
    value: "R$ 1.250.000",
    status: "Em negociação",
    endDate: "10/08/2026",
  },
  {
    id: "contract-2",
    client: "Lucas Martins",
    property: "Casa com Área Gourmet",
    value: "R$ 890.000",
    status: "Assinado",
    endDate: "02/09/2026",
  },
  {
    id: "contract-3",
    client: "Fernanda Lima",
    property: "Sala Comercial Central",
    value: "R$ 4.500/mês",
    status: "Minuta enviada",
    endDate: "18/07/2026",
  },
];

export default function RealtorContracts() {
  const [search, setSearch] = useState("");

  const filteredContracts = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return contracts;
    }

    return contracts.filter((contract) =>
      [contract.client, contract.property, contract.status, contract.value]
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [search]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Contratos</h2>
          <p className="text-sm text-muted-foreground">Acompanhe o andamento dos contratos relacionados às suas negociações.</p>
        </div>
        <div className="relative w-full lg:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por cliente, imóvel ou status" className="pl-9" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Negociações abertas</CardTitle>
            <CardDescription>Contratos em andamento.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {contracts.filter((contract) => contract.status !== "Assinado").length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Assinados</CardTitle>
            <CardDescription>Fechados com sucesso.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {contracts.filter((contract) => contract.status === "Assinado").length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Carteira ativa</CardTitle>
            <CardDescription>Total acompanhado por você.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{contracts.length}</CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Imóvel</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.client}</TableCell>
                <TableCell>{contract.property}</TableCell>
                <TableCell>{contract.value}</TableCell>
                <TableCell>{contract.endDate}</TableCell>
                <TableCell>
                  <Badge variant={contract.status === "Assinado" ? "default" : "secondary"}>
                    <FileText className="mr-1 h-3 w-3" />
                    {contract.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredContracts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  Nenhum contrato encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
