import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { Film, ImagePlus, ScanSearch } from "lucide-react";

const blocks = [
  {
    title: "Biblioteca central",
    description: "Este espaço deve reunir imagens, vídeos e ativos reutilizáveis do catálogo imobiliário conforme o fluxo de mídia amadurecer.",
    icon: ImagePlus,
  },
  {
    title: "Revisão e curadoria",
    description: "A estrutura visual já prepara um cenário onde o admin consegue validar qualidade, cobertura visual e consistência dos anúncios.",
    icon: ScanSearch,
  },
  {
    title: "Vídeos e tours",
    description: "Quando a operação suportar mais formatos, esta área também pode concentrar vídeos, tours virtuais e pendências de publicação.",
    icon: Film,
  },
];

export default function Medias() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Mídia</h2>
        <p className="text-sm text-muted-foreground">Área reservada para gestão visual do portfólio imobiliário.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {blocks.map((block) => {
          const Icon = block.icon;

          return (
            <Card key={block.title}>
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-muted">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{block.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">{block.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
