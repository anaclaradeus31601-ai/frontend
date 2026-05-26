import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { useUserById } from "#hooks/use-users";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { UserRole } from "../../../types/database";

export default function ShowRealtors() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: realtor, isLoading, isError } = useUserById(id);

  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate(-1)} variant="ghost"><ChevronLeft className="mr-1 h-4 w-4" />Voltar</Button>
      {isLoading ? (
        <div>Carregando corretor...</div>
      ) : isError || !realtor || realtor.role !== UserRole.REALTOR ? (
        <div>Corretor não encontrado.</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{realtor.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>E-mail:</strong> {realtor.email}</p>
            <p><strong>Telefone:</strong> {realtor.phone ?? "Não informado"}</p>
            <p><strong>Role:</strong> {realtor.role}</p>
            <p><strong>Verificado:</strong> {realtor.emailVerified ? "Sim" : "Não"}</p>
            <p><strong>Criado em:</strong> {new Date(realtor.createdAt).toLocaleString("pt-BR")}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
