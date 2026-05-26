import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { usePropertyById } from "../../../hooks/use-public-properties";
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

export default function ShowProperty() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: property, isLoading, isError } = usePropertyById(id);

  return (
    <div className="p-6 space-y-6">
      <Button onClick={() => navigate(-1)} variant="ghost"><ChevronLeft className="mr-1 h-4 w-4" />Voltar</Button>
      {isLoading ? (
        <div>Carregando imóvel...</div>
      ) : isError || !property ? (
        <div>Imóvel não encontrado.</div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{property.title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 md:grid-cols-2">
            <p><strong>Status:</strong> {property.status}</p>
            <p><strong>Transação:</strong> {property.transactionType}</p>
            <p><strong>Endereço:</strong> {property.street}, {property.number} - {property.neighborhood}</p>
            <p><strong>Cidade:</strong> {property.city}/{property.state}</p>
            <p><strong>Área:</strong> {property.area}m2</p>
            <p><strong>Quartos:</strong> {property.bedrooms}</p>
            <p><strong>Banheiros:</strong> {property.bathrooms}</p>
            <p><strong>Garagens:</strong> {property.garages ?? 0}</p>
            <p><strong>Aluguel:</strong> {formatCurrency(property.rentPrice)}</p>
            <p><strong>Venda:</strong> {formatCurrency(property.salePrice)}</p>
            <p className="md:col-span-2"><strong>Descrição:</strong> {property.description}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
