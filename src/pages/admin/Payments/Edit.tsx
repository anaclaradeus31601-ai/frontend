import { Alert, AlertDescription } from "#components/ui/alert";
import { Button } from "#components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditPayments() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate(-1)} variant="ghost"><ChevronLeft className="mr-1 h-4 w-4" />Voltar</Button>
      <Alert>
        <AlertDescription>
          A edição de pagamento por tela foi removida do modo mock. Como a API não expõe leitura de pagamento, esta página precisa de um `GET /payment/:id` antes de poder carregar dados reais.
        </AlertDescription>
      </Alert>
    </div>
  );
}
