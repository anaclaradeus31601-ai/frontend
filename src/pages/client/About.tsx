import { PublicPageShell, PublicSectionHeading } from "#components/marketing/public-page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { Building2, ShieldCheck, Sparkles, UsersRound } from "lucide-react";

const pillars = [
  {
    title: "Curadoria real",
    description: "Nossa proposta é combinar vitrine bonita com operação séria, para o cliente encontrar oportunidades com contexto e não só uma lista fria de imóveis.",
    icon: Building2,
  },
  {
    title: "Processo transparente",
    description: "Buscas, visitas, contratos e pagamentos precisam conversar entre si. O produto foi pensado para deixar essa jornada mais clara para todas as pontas.",
    icon: ShieldCheck,
  },
  {
    title: "Experiência humana",
    description: "Mesmo com tecnologia no centro, a decisão imobiliária continua sendo humana. Por isso, o tom da plataforma privilegia clareza, confiança e acompanhamento.",
    icon: UsersRound,
  },
];

const stats = [
  { label: "Visão", value: "360°", detail: "Jornada conectada entre cliente, corretor, proprietário e admin." },
  { label: "Foco", value: "UX + operação", detail: "Design voltado para descoberta, negociação e acompanhamento." },
  { label: "Tom", value: "Clareza", detail: "Interfaces que reduzem atrito em uma decisão naturalmente complexa." },
];

export default function About() {
  return (
    <PublicPageShell
      eyebrow="Sobre nós"
      title="Uma plataforma imobiliária pensada para operação e confiança"
      description="A EstateFlow nasce da ideia de que experiência e gestão não precisam andar separadas. O mesmo sistema que organiza a imobiliária também deve acolher o cliente."
    >
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-0 bg-slate-950 text-white ring-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="h-5 w-5 text-cyan-300" />
              O que queremos construir
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-sm leading-7 text-slate-200 md:text-base">
            <p>
              Comprar, vender ou alugar um imóvel não é uma tarefa mecânica. Existe expectativa, insegurança, comparação e negociação em cada etapa. Por isso, a EstateFlow foi desenhada para ser mais do que um catálogo.
            </p>
            <p>
              A proposta é unir design claro, informação útil e visão operacional. O cliente encontra o imóvel com mais contexto. O corretor acompanha melhor suas oportunidades. O admin organiza o negócio com menos ruído.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {stats.map((item) => (
            <Card key={item.label} className="border-0 bg-cyan-50 ring-1 ring-cyan-100">
              <CardContent className="space-y-2 pt-6">
                <p className="text-sm font-medium text-cyan-800">{item.label}</p>
                <p className="text-3xl font-semibold tracking-tight text-slate-900">{item.value}</p>
                <p className="text-sm leading-6 text-slate-600">{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <PublicSectionHeading
          eyebrow="Pilares"
          title="A base do produto"
          description="Esses pilares guiam como a marca se apresenta e como as páginas públicas devem evoluir daqui para frente."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <Card key={pillar.title} className="border-0 bg-white ring-1 ring-slate-200">
                <CardContent className="space-y-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">{pillar.title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">{pillar.description}</p>
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
