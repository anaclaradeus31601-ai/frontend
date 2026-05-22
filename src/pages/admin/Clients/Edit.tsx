import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createZodFormHandler } from "../../../lib/zod-form";
import { editClientSchema } from "../../../validations/admin-forms";

export default function EditClients() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
        <ChevronLeft />
        Voltar
      </Button>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Editar Cliente</h2>
        <p className="text-sm text-muted-foreground">Atualize os dados do cliente {id ? `#${id}` : ""}.</p>
      </div>

      <form className="space-y-6" onSubmit={createZodFormHandler(editClientSchema)}>
        <Card>
          <CardHeader>
            <CardTitle>Dados pessoais</CardTitle>
            <CardDescription>Revise as informações principais do cliente.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="client-name">Nome completo</Label>
              <Input id="client-name" defaultValue="João da Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-cpf">CPF</Label>
              <Input id="client-cpf" defaultValue="000.000.000-00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-birth">Data de nascimento</Label>
              <Input id="client-birth" type="date" defaultValue="1990-01-01" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contato e interesse</CardTitle>
            <CardDescription>Mantenha as preferências de atendimento sempre atualizadas.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="client-email">E-mail</Label>
              <Input id="client-email" type="email" defaultValue="cliente@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-phone">Telefone</Label>
              <Input id="client-phone" defaultValue="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label>Tipo de interesse</Label>
              <Select defaultValue="rent">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Aluguel</SelectItem>
                  <SelectItem value="sale">Compra</SelectItem>
                  <SelectItem value="both">Ambos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de imóvel</Label>
              <Select defaultValue="apartment">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">Casa</SelectItem>
                  <SelectItem value="apartment">Apartamento</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                  <SelectItem value="land">Terreno</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-budget">Faixa de orçamento</Label>
              <Input id="client-budget" defaultValue="R$ 350.000,00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client-city">Cidade de interesse</Label>
              <Input id="client-city" defaultValue="Florianópolis" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="client-notes">Observações</Label>
              <Textarea id="client-notes" defaultValue="Cliente com urgência de mudança e preferência por região central." />
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
