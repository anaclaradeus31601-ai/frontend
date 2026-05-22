import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createZodFormHandler } from "../../../lib/zod-form";
import { editOwnerSchema } from "../../../validations/admin-forms";

export default function EditOwners() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
        <ChevronLeft />
        Voltar
      </Button>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Editar Proprietário</h2>
        <p className="text-sm text-muted-foreground">Atualize os dados do proprietário {id ? `#${id}` : ""}.</p>
      </div>

      <form className="space-y-6" onSubmit={createZodFormHandler(editOwnerSchema)}>
        <Card>
          <CardHeader>
            <CardTitle>Dados principais</CardTitle>
            <CardDescription>Informações de cadastro e contato.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="owner-name">Nome completo</Label>
              <Input id="owner-name" defaultValue="Maria Oliveira" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-cpf">CPF/CNPJ</Label>
              <Input id="owner-cpf" defaultValue="000.000.000-00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-email">E-mail</Label>
              <Input id="owner-email" type="email" defaultValue="proprietario@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-phone">Telefone</Label>
              <Input id="owner-phone" defaultValue="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-rg">RG</Label>
              <Input id="owner-rg" defaultValue="00.000.000-0" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endereço e observações</CardTitle>
            <CardDescription>Dados complementares para o relacionamento com o proprietário.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="owner-street">Rua</Label>
              <Input id="owner-street" defaultValue="Rua das Palmeiras" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-number">Número</Label>
              <Input id="owner-number" defaultValue="123" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-neighborhood">Bairro</Label>
              <Input id="owner-neighborhood" defaultValue="Centro" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-city">Cidade</Label>
              <Input id="owner-city" defaultValue="Florianópolis" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-state">Estado</Label>
              <Input id="owner-state" defaultValue="SC" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="owner-notes">Observações</Label>
              <Textarea id="owner-notes" defaultValue="Prefere contato por WhatsApp e possui mais de um imóvel em negociação." />
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
