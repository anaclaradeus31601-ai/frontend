import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { useClients, useRealtors } from "#hooks/use-users";
import { useContracts } from "#hooks/use-contracts";
import { useProperties } from "#hooks/use-properties";
import { useVisits } from "#hooks/use-visits";

export default function AdminHome() {
  const { data: clients = [], isLoading: loadingClients } = useClients();
  const { data: realtors = [], isLoading: loadingRealtors } = useRealtors();
  const { data: properties, loading: loadingProperties } = useProperties();
  const { data: visits, loading: loadingVisits } = useVisits();
  const { data: contracts, loading: loadingContracts } = useContracts();

  const isLoading = loadingClients || loadingRealtors || loadingProperties || loadingVisits || loadingContracts;

  const summaryCards = [
    {
      title: "Clientes",
      value: clients.length,
      description: "Usuários com perfil de cliente",
    },
    {
      title: "Corretores",
      value: realtors.length,
      description: "Usuários com perfil de corretor",
    },
    {
      title: "Imóveis",
      value: properties.length,
      description: "Itens cadastrados no sistema",
    },
    {
      title: "Visitas",
      value: visits.length,
      description: "Agendamentos já registrados",
    },
    {
      title: "Contratos",
      value: contracts.length,
      description: "Negociações em acompanhamento",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Admin</h2>
        <p className="text-sm text-muted-foreground">Resumo operacional do sistema em tempo real.</p>
      </div>

      {isLoading ? (
        <div className="text-sm text-muted-foreground">Carregando indicadores...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {summaryCards.map((card) => (
            <Card key={card.title}>
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold tracking-tight">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
