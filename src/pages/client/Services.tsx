import { PublicPageShell, PublicSectionHeading } from "#components/marketing/public-page-shell";
import { Card, CardContent } from "#components/ui/card";
import { BriefcaseBusiness, FileText, HousePlus, KeyRound, SearchCheck } from "lucide-react";

const services = [
  {
    title: "Compra assistida",
    description: "Busca com curadoria, comparação prática e acompanhamento comercial para quem quer comprar com mais confiança.",
    icon: SearchCheck,
  },
  {
    title: "Venda com posicionamento",
    description: "Estrutura para apresentar o imóvel com mais clareza, gerar interesse qualificado e apoiar negociações até o fechamento.",
    icon: HousePlus,
  },
  {
    title: "Locação e visitas",
    description: "Organização de agenda, interesse e histórico para reduzir atrito entre descoberta, visita e conversão.",
    icon: KeyRound,
  },
  {
    title: "Contratos e documentos",
    description: "Fluxos administrativos mais legíveis para alinhar termos, pendências e documentação da negociação.",
    icon: FileText,
  },
  {
    title: "Operação da imobiliária",
    description: "Visão integrada para corretores, clientes, proprietários, contratos e pagamentos em um mesmo ambiente.",
    icon: BriefcaseBusiness,
  },
];

export default function Services() {
  return (
    <PublicPageShell
      eyebrow="Serviços"
      title="Uma operação que acompanha o imóvel do interesse ao fechamento"
      description="A EstateFlow organiza a experiência pública e também o backstage do negócio. Isso faz diferença na confiança percebida em cada contato."
    >
      <section className="space-y-6">
        <PublicSectionHeading
          eyebrow="Oferta"
          title="Como ajudamos em cada etapa"
          description="Mesmo usando conteúdo inicial, a página já deve comunicar amplitude de serviço e maturidade operacional."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card key={service.title} className="border-0 bg-white ring-1 ring-slate-200">
                <CardContent className="space-y-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">{service.title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">{service.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </PublicPageShell>
  );
}
