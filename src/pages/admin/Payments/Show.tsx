import { Alert, AlertDescription } from "#components/ui/alert";
import { Button } from "#components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ShowPayments() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate(-1)} variant="ghost"><ChevronLeft className="mr-1 h-4 w-4" />Voltar</Button>
      <Alert>
        <AlertDescription>
          O backend ainda não expõe consulta de pagamento por ID. Esta tela deixou de usar mock e agora mostra apenas a limitação real da API.
        </AlertDescription>
      </Alert>
    </div>
  );
}
