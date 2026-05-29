import { Link } from "react-router-dom";
import { PublicPageShell, PublicSectionHeading } from "#components/marketing/public-page-shell";
import { Button } from "#components/ui/button";
import { Card, CardContent } from "#components/ui/card";
import { ArrowRight, Heart, HousePlus, MessagesSquare, Sparkles } from "lucide-react";

const nextSteps = [
  {
    icon: Heart,
    title: "Reveja seus favoritos",
    description: "Os imóveis salvos funcionam como sua shortlist. Use-os para comparar localização, faixa de preço e próximos passos.",
    actionLabel: "Abrir favoritos",
    actionHref: "/favoritos",
  },
  {
    icon: MessagesSquare,
    title: "Fale com a equipe",
    description: "Quando encontrar um imóvel interessante, o próximo movimento é iniciar uma conversa e alinhar visita, documentação e timing.",
    actionLabel: "Ir para contato",
    actionHref: "/contact",
  },
  {
    icon: HousePlus,
    title: "Quer anunciar um imóvel?",
    description: "Se além de buscar você também pretende vender ou alugar, use o fluxo público de captação para apresentar sua oportunidade.",
    actionLabel: "Anunciar imóvel",
    actionHref: "/owner",
  },
];

export default function MyProperties() {
  return (
    <PublicPageShell
      eyebrow="Minha jornada"
      title="Acompanhe seus interesses e organize o próximo passo"
      description="Nesta primeira versão, a área do cliente funciona como um painel de relacionamento: favoritos, intenção de contato e caminhos para avançar com a imobiliária."
    >
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-0 bg-slate-950 text-white ring-0">
          <CardContent className="space-y-5 pt-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Seu espaço ainda está começando</h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
                Como ainda não existe uma API dedicada de “solicitações” ou “interesses”, esta página assume o papel de central de próximos passos. O desenho já prepara o terreno para evoluir quando esse backend chegar.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/properties">Explorar imóveis</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10">
                <Link to="/favoritos">Ver favoritos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-cyan-50 ring-1 ring-cyan-100">
          <CardContent className="space-y-4 pt-6">
            <PublicSectionHeading
              eyebrow="Estado atual"
              title="Sem pipeline ativo"
              description="Nenhuma visita, negociação ou solicitação estruturada apareceu ainda. Até isso existir, os CTAs abaixo guiam a próxima ação."
            />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <PublicSectionHeading
          eyebrow="Próximos passos"
          title="Três caminhos práticos para avançar"
          description="A página não tenta fingir dados inexistentes. Em vez disso, transforma o vazio em navegação útil."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {nextSteps.map((step) => {
            const Icon = step.icon;

            return (
              <Card key={step.title} className="border-0 bg-white ring-1 ring-slate-200">
                <CardContent className="space-y-4 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">{step.description}</p>
                  </div>
                  <Button asChild variant="outline" className="w-full justify-between">
                    <Link to={step.actionHref}>
                      {step.actionLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </PublicPageShell>
  );
}
