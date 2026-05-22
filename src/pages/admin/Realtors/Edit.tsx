import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createZodFormHandler } from "../../../lib/zod-form";
import { editRealtorSchema } from "../../../validations/admin-forms";

export default function EditRealtors() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
        <ChevronLeft />
        Voltar
      </Button>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Editar Corretor</h2>
        <p className="text-sm text-muted-foreground">Atualize o perfil do corretor {id ? `#${id}` : ""}.</p>
      </div>

      <form className="space-y-6" onSubmit={createZodFormHandler(editRealtorSchema)}>
        <Card>
          <CardHeader>
            <CardTitle>Perfil profissional</CardTitle>
            <CardDescription>Dados de contato e atuação do corretor.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="realtor-name">Nome completo</Label>
              <Input id="realtor-name" defaultValue="Ana Costa" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="realtor-email">E-mail</Label>
              <Input id="realtor-email" type="email" defaultValue="corretor@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="realtor-phone">Telefone</Label>
              <Input id="realtor-phone" defaultValue="(11) 99999-9999" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="realtor-cpf">CPF</Label>
              <Input id="realtor-cpf" defaultValue="000.000.000-00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="realtor-creci">CRECI</Label>
              <Input id="realtor-creci" defaultValue="123456-F" />
            </div>
            <div className="space-y-2">
              <Label>Especialidade</Label>
              <Select defaultValue="sale">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">Locação</SelectItem>
                  <SelectItem value="sale">Venda</SelectItem>
                  <SelectItem value="high-standard">Alto padrão</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="realtor-photo">Foto de perfil</Label>
              <Input id="realtor-photo" type="file" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="realtor-bio">Bio</Label>
              <Textarea id="realtor-bio" defaultValue="Especialista em imóveis residenciais e atendimento consultivo para primeira compra." />
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
