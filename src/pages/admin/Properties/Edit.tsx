import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createZodFormHandler } from "../../../lib/zod-form";
import { editPropertySchema } from "../../../validations/admin-forms";

export default function EditProperties() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
        <ChevronLeft />
        Voltar
      </Button>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Editar Imóvel</h2>
        <p className="text-sm text-muted-foreground">Atualize os dados do imóvel {id ? `#${id}` : ""}.</p>
      </div>

      <form className="space-y-6" onSubmit={createZodFormHandler(editPropertySchema)}>
        <Card>
          <CardHeader>
            <CardTitle>Informações principais</CardTitle>
            <CardDescription>Revise título, negociação e descrição.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="property-title">Título</Label>
              <Input id="property-title" defaultValue="Casa moderna com piscina" />
            </div>
            <div className="space-y-2">
              <Label>Tipo de negociação</Label>
              <Select defaultValue="rent">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Aluguel</SelectItem>
                  <SelectItem value="sale">Venda</SelectItem>
                  <SelectItem value="both">Ambos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select defaultValue="residential">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residencial</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="land">Terreno</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-rent-price">Valor do aluguel</Label>
              <Input id="property-rent-price" defaultValue="R$ 2.500,00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-sale-price">Valor da venda</Label>
              <Input id="property-sale-price" defaultValue="R$ 750.000,00" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="property-description">Descrição</Label>
              <Textarea id="property-description" defaultValue="Imóvel com excelente iluminação natural, área gourmet e localização privilegiada." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Características e endereço</CardTitle>
            <CardDescription>Edite métricas, localização e estrutura do imóvel.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="property-bedrooms">Quartos</Label>
              <Input id="property-bedrooms" type="number" min="0" defaultValue="3" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-bathrooms">Banheiros</Label>
              <Input id="property-bathrooms" type="number" min="0" defaultValue="2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-garages">Garagens</Label>
              <Input id="property-garages" type="number" min="0" defaultValue="2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-area">Área (m²)</Label>
              <Input id="property-area" type="number" min="0" defaultValue="150" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="property-street">Rua</Label>
              <Input id="property-street" defaultValue="Av. Beira Mar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-number">Número</Label>
              <Input id="property-number" defaultValue="2500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-complement">Complemento</Label>
              <Input id="property-complement" defaultValue="Apto 302" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-neighborhood">Bairro</Label>
              <Input id="property-neighborhood" defaultValue="Jurerê" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-city">Cidade</Label>
              <Input id="property-city" defaultValue="Florianópolis" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-state">Estado</Label>
              <Input id="property-state" defaultValue="SC" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-zip-code">CEP</Label>
              <Input id="property-zip-code" defaultValue="00000-000" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relacionamentos e mídia</CardTitle>
            <CardDescription>Dados do proprietário, corretor e arquivos do anúncio.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="property-owner">ID do proprietário</Label>
              <Input id="property-owner" type="number" min="1" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-realtor">ID do corretor</Label>
              <Input id="property-realtor" type="number" min="1" defaultValue="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-tour">Tour virtual</Label>
              <Input id="property-tour" defaultValue="https://example.com/tour" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property-video">Vídeo</Label>
              <Input id="property-video" defaultValue="https://youtube.com/watch?v=123" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="property-images">Atualizar imagens</Label>
              <Input id="property-images" type="file" multiple />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>
    </div>
  );
}
