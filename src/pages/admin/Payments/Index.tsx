import { Alert, AlertDescription } from "#components/ui/alert";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { useNavigate } from "react-router-dom";

export default function IndexPayments() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Pagamentos</h2>
        <Button className="ml-auto" onClick={() => navigate("/admin/payments/create")}>Criar Pagamento</Button>
      </div>

      <Alert>
        <AlertDescription>
          A API atual expõe apenas criação, atualização e remoção de pagamentos. Como ainda não existe rota `GET /payment`, esta tela não mostra listagem real para evitar mocks.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Leitura indisponível</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Quando o backend expuser uma rota de leitura para pagamentos, esta página pode ser ligada à API da mesma forma que imóveis, visitas e contratos.
        </CardContent>
      </Card>
    </div>
  );
}
