import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { useAuth } from "../../../contexts/auth-context";

export default function ShowSettings() {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-sm text-muted-foreground">Sessão e dados do administrador autenticado.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuário atual</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Nome:</strong> {user?.name ?? "Não identificado"}</p>
          <p><strong>E-mail:</strong> {user?.email ?? "Não identificado"}</p>
          <p><strong>Telefone:</strong> {user?.phone ?? "Não informado"}</p>
          <p><strong>Role:</strong> {user?.role ?? "Não identificado"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
