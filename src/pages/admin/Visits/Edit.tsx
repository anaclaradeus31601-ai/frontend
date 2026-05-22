import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createZodFormHandler } from "../../../lib/zod-form";
import { editVisitSchema } from "../../../validations/admin-forms";

export default function EditVisits() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
        <ChevronLeft />
        Voltar
      </Button>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Editar Visita</h2>
        <p className="text-sm text-muted-foreground">Ajuste o agendamento da visita {id ? `#${id}` : ""}.</p>
      </div>

      <form className="space-y-6" onSubmit={createZodFormHandler(editVisitSchema)}>
        <Card>
          <CardHeader>
            <CardTitle>Agendamento</CardTitle>
            <CardDescription>Cliente, imóvel, corretor e horário da visita.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="visit-property">Imóvel</Label>
              <Input id="visit-property" defaultValue="Apartamento 101" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit-client">Cliente</Label>
              <Input id="visit-client" defaultValue="João Silva" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit-realtor">Corretor</Label>
              <Input id="visit-realtor" defaultValue="Carlos Pereira" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue="scheduled">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Agendada</SelectItem>
                  <SelectItem value="completed">Concluída</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit-date">Data</Label>
              <Input id="visit-date" type="date" defaultValue="2026-05-21" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visit-time">Hora</Label>
              <Input id="visit-time" type="time" defaultValue="14:00" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="visit-notes">Observações</Label>
              <Textarea id="visit-notes" defaultValue="Cliente solicitou visita no período da tarde e quer avaliar vagas de garagem." />
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
