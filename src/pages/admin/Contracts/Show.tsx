import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { useContractById } from "../../../hooks/use-public-properties";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function formatCurrency(value?: number | null) {
  if (value == null) {
    return "Não informado";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function ShowContracts() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: contract, isLoading, isError } = useContractById(id);

  return (
    <div className="p-6">
      <div className="space-y-6">
        <Button onClick={() => navigate(-1)} variant="ghost"><ChevronLeft className="h-4 w-4" />Voltar</Button>
        {isLoading ? (
          <div>Carregando contrato...</div>
        ) : isError || !contract ? (
          <div>Contrato não encontrado.</div>
        ) : (
          <Card>
            <CardHeader className="flex">
              <CardTitle>Detalhes do contrato: {contract.client?.name ?? contract.clientId}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Imóvel:</strong> {contract.property?.title ?? contract.propertyId}</p>
              <p><strong>Documento:</strong> {contract.documentUrl ? <a href={contract.documentUrl} target="_blank" rel="noreferrer">Clique aqui</a> : "Não informado"}</p>
              <p><strong>Início:</strong> {contract.startDate}</p>
              <p><strong>Fim:</strong> {contract.endDate ?? "Sem prazo"}</p>
              <p><strong>Valor:</strong> {formatCurrency(contract.saleValue ?? contract.rentValue)}</p>
              <p><strong>Status:</strong> {contract.status}</p>
              <p><strong>Termos:</strong> {contract.terms}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
