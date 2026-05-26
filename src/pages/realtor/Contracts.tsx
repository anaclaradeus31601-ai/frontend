import { Badge } from "#components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useAuth } from "../../contexts/auth-context";
import { usePublicContracts, usePropertiesByRealtor } from "../../hooks/use-public-properties";
import { FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";

function formatCurrency(value?: number | null) {
  if (value == null) {
    return "Sob consulta";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function RealtorContracts() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const { data: properties = [] } = usePropertiesByRealtor(user?.id);
  const { data: contracts = [], isLoading } = usePublicContracts();

  const propertyIds = useMemo(() => new Set(properties.map((property) => property.id)), [properties]);

  const realtorContracts = useMemo(
    () => contracts.filter((contract) => propertyIds.has(contract.propertyId)),
    [contracts, propertyIds],
  );

  const filteredContracts = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return realtorContracts;
    }

    return realtorContracts.filter((contract) =>
      [
        contract.client?.name,
        contract.property?.title,
        contract.status,
        contract.saleValue,
        contract.rentValue,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [realtorContracts, search]);

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
            {realtorContracts.filter((contract) => contract.status !== "ACTIVE").length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ativos</CardTitle>
            <CardDescription>Fechados com sucesso.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {realtorContracts.filter((contract) => contract.status === "ACTIVE").length}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Carteira ativa</CardTitle>
            <CardDescription>Total acompanhado por você.</CardDescription>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{realtorContracts.length}</CardContent>
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  Carregando contratos...
                </TableCell>
              </TableRow>
            ) : filteredContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.client?.name ?? contract.clientId}</TableCell>
                <TableCell>{contract.property?.title ?? contract.propertyId}</TableCell>
                <TableCell>{formatCurrency(contract.saleValue ?? contract.rentValue)}</TableCell>
                <TableCell>{contract.endDate ?? "Sem prazo"}</TableCell>
                <TableCell>
                  <Badge variant={contract.status === "ACTIVE" ? "default" : "secondary"}>
                    <FileText className="mr-1 h-3 w-3" />
                    {contract.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && filteredContracts.length === 0 && (
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
