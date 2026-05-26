import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { useUserById } from "#hooks/use-users";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { UserRole } from "../../../types/database";

export default function ShowClients() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: client, isLoading, isError } = useUserById(id);

  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate(-1)} variant="ghost"><ChevronLeft className="mr-1 h-4 w-4" />Voltar</Button>
      {isLoading ? (
        <div>Carregando cliente...</div>
      ) : isError || !client || client.role !== UserRole.CLIENT ? (
        <div>Cliente não encontrado.</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{client.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>E-mail:</strong> {client.email}</p>
            <p><strong>Telefone:</strong> {client.phone ?? "Não informado"}</p>
            <p><strong>Role:</strong> {client.role}</p>
            <p><strong>Verificado:</strong> {client.emailVerified ? "Sim" : "Não"}</p>
            <p><strong>Criado em:</strong> {new Date(client.createdAt).toLocaleString("pt-BR")}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
