import { PublicPageShell, PublicSectionHeading } from "#components/marketing/public-page-shell";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { Clock3, Mail, MapPinned, MessageCircleMore, Phone } from "lucide-react";

const channels = [
  { icon: Mail, title: "E-mail", value: "contato@estateflow.com", helper: "Para dúvidas comerciais, suporte e parcerias." },
  { icon: Phone, title: "Telefone", value: "(11) 4000-2024", helper: "Atendimento de segunda a sexta, das 9h às 18h." },
  { icon: MessageCircleMore, title: "WhatsApp", value: "(11) 99999-0000", helper: "Contato rápido para interesse em imóveis e visitas." },
];

export default function Contact() {
  return (
    <PublicPageShell
      eyebrow="Contato"
      title="Fale com a equipe e avance no próximo passo"
      description="Se você quer comprar, vender, alugar ou anunciar um imóvel, esta é a porta de entrada para uma conversa mais objetiva."
    >
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-0 bg-slate-950 text-white ring-0">
          <CardHeader>
            <CardTitle className="text-2xl">Canais de atendimento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {channels.map((channel) => {
              const Icon = channel.icon;

              return (
                <div key={channel.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-300">{channel.title}</p>
                      <p className="font-medium">{channel.value}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">{channel.helper}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-0 bg-white ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle className="text-2xl">Informações rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <InfoBlock icon={MapPinned} title="Endereço" text="Av. das Negociações, 2450, São Paulo - SP" />
            <InfoBlock icon={Clock3} title="Horário" text="Segunda a sexta, 9h às 18h. Sábado com agendamento." />
            <div className="md:col-span-2 rounded-2xl bg-cyan-50 p-5 text-sm leading-7 text-slate-700">
              <p className="font-semibold text-slate-900">Atendimento orientado à decisão</p>
              <p>
                Para a primeira versão, esta página foca em clareza e confiança. O próximo passo natural é acoplar um formulário conectado à API quando o fluxo comercial estiver definido.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild>
                  <a href="mailto:contato@estateflow.com">Enviar e-mail</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://wa.me/5511999990000" target="_blank" rel="noreferrer">
                    Falar no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <PublicSectionHeading
          eyebrow="Mapa"
          title="Onde estamos"
          description="Um bloco visual simples para reforçar presença física e contexto institucional."
        />
        <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
          <iframe
            title="Mapa EstateFlow"
            src="https://www.google.com/maps?q=São%20Paulo%20SP&output=embed"
            width="100%"
            height="320"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </PublicPageShell>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-cyan-300">
        <Icon className="h-5 w-5" />
      </div>
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
