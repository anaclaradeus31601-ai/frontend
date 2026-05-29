import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useAuditLogs } from "#hooks/use-audit";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AuditPage() {
  const [search, setSearch] = useState("");
  const { data: logs = [], isLoading, refetch } = useAuditLogs({
    search: search.trim() || undefined,
    limit: 100,
  });

  const groupedSummary = useMemo(() => {
    const byResource = new Map<string, number>();

    logs.forEach((log) => {
      byResource.set(log.resource, (byResource.get(log.resource) ?? 0) + 1);
    });

    return Array.from(byResource.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
  }, [logs]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Auditoria</h2>
          <p className="text-sm text-muted-foreground">Visualize as ações administrativas e operacionais registradas pelo sistema.</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <div className="relative w-full lg:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome, e-mail, rota ou recurso"
              className="pl-9"
            />
          </div>
          <Button variant="outline" onClick={() => void refetch()}>
            Atualizar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total recente</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{logs.length}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Última ação</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {logs[0] ? `${logs[0].actorName} · ${logs[0].action}` : "Sem dados"}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recursos mais acessados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            {groupedSummary.length === 0
              ? "Sem dados"
              : groupedSummary.map(([resource, count]) => (
                  <div key={resource}>
                    {resource}: {count}
                  </div>
                ))}
          </CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quando</TableHead>
              <TableHead>Usuário</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Ação</TableHead>
              <TableHead>Recurso</TableHead>
              <TableHead>Método</TableHead>
              <TableHead>Rota</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                  Carregando auditoria...
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                  Nenhum log encontrado.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{formatDateTime(log.createdAt)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{log.actorName}</div>
                    <div className="text-xs text-muted-foreground">{log.actorEmail}</div>
                  </TableCell>
                  <TableCell>{log.actorRole}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.resource}</TableCell>
                  <TableCell>{log.method}</TableCell>
                  <TableCell className="max-w-60 truncate">{log.path}</TableCell>
                  <TableCell>{log.responseStatus}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
