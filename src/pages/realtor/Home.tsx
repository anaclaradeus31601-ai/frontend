import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";

const summaryCards = [
  {
    title: "Imóveis ativos",
    value: "12",
    description: "Anúncios sob sua responsabilidade",
  },
  {
    title: "Visitas da semana",
    value: "8",
    description: "Agendamentos pendentes e confirmados",
  },
  {
    title: "Contratos em andamento",
    value: "4",
    description: "Negociações acompanhadas por você",
  },
];

export default function RealtorHome() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard do Corretor</h2>
        <p className="text-sm text-muted-foreground">Acompanhe seus imóveis, visitas e contratos.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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
    </div>
  );
}
