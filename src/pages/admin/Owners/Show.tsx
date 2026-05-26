import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { useOwnerById } from "../../../hooks/use-public-properties";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function ShowOwners() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: owner, isLoading, isError } = useOwnerById(id);

  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate(-1)} variant="ghost"><ChevronLeft className="mr-1 h-4 w-4" />Voltar</Button>
      {isLoading ? (
        <div>Carregando proprietário...</div>
      ) : isError || !owner ? (
        <div>Proprietário não encontrado.</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{owner.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>E-mail:</strong> {owner.email}</p>
            <p><strong>Telefone:</strong> {owner.phone}</p>
            <p><strong>CPF/CNPJ:</strong> {owner.cpfCnpj}</p>
            <p><strong>Endereço:</strong> {owner.address || "Não informado"}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
