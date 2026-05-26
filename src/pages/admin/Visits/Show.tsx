import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { useVisitById } from "#hooks/use-visit-queries";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function ShowVisits() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: visit, isLoading, isError } = useVisitById(id);

  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate(-1)} variant="ghost"><ChevronLeft className="mr-1 h-4 w-4" />Voltar</Button>
      {isLoading ? (
        <div>Carregando visita...</div>
      ) : isError || !visit ? (
        <div>Visita não encontrada.</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Visita {visit.id}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><strong>Imóvel:</strong> {visit.property?.title ?? visit.propertyId}</p>
            <p><strong>Cliente:</strong> {visit.client?.name ?? visit.clientId}</p>
            <p><strong>Corretor:</strong> {visit.realtor?.name ?? visit.realtorId}</p>
            <p><strong>Status:</strong> {visit.status}</p>
            <p><strong>Agendada para:</strong> {new Date(visit.scheduledAt).toLocaleString("pt-BR")}</p>
            <p><strong>Duração:</strong> {visit.duration ?? 0} minutos</p>
            <p><strong>Observações:</strong> {visit.notes || "Sem observações."}</p>
            <p><strong>Feedback:</strong> {visit.feedback || "Sem feedback."}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
