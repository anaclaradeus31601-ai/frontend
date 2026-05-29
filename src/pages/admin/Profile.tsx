import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { useAuth } from "../../contexts/auth-context";

export default function AdminProfile() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Meu perfil</h2>
        <p className="text-sm text-muted-foreground">Resumo rápido da conta administrativa autenticada.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da conta</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Info label="Nome" value={user?.name ?? "Não identificado"} />
          <Info label="E-mail" value={user?.email ?? "Não identificado"} />
          <Info label="Telefone" value={user?.phone ?? "Não informado"} />
          <Info label="Perfil" value={user?.role ?? "Não identificado"} />
        </CardContent>
      </Card>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/40 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-base font-medium">{value}</p>
    </div>
  );
}
