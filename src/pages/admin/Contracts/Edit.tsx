import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createZodFormHandler } from "../../../lib/zod-form";
import { editContractSchema } from "../../../validations/admin-forms";

export default function EditContracts() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
        <ChevronLeft />
        Voltar
      </Button>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Editar Contrato</h2>
        <p className="text-sm text-muted-foreground">Atualize as informações do contrato {id ? `#${id}` : ""}.</p>
      </div>

      <form className="space-y-6" onSubmit={createZodFormHandler(editContractSchema)}>
        <Card>
          <CardHeader>
            <CardTitle>Informações contratuais</CardTitle>
            <CardDescription>Dados do vínculo, período e status.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contract-client">Cliente</Label>
              <Input id="contract-client" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract-property">Imóvel</Label>
              <Input id="contract-property" defaultValue="Casa moderna com piscina" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract-realtor">Corretor</Label>
              <Input id="contract-realtor" defaultValue="Ana Clara" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue="active">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="expiring">Vencendo</SelectItem>
                  <SelectItem value="expired">Vencido</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract-start-date">Data de início</Label>
              <Input id="contract-start-date" type="date" defaultValue="2026-01-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract-end-date">Data de vencimento</Label>
              <Input id="contract-end-date" type="date" defaultValue="2027-01-10" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract-value">Valor</Label>
              <Input id="contract-value" defaultValue="R$ 2.500,00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract-doc-url">URL do documento</Label>
              <Input id="contract-doc-url" defaultValue="https://example.com/contrato.pdf" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="contract-notes">Cláusulas e observações</Label>
              <Textarea id="contract-notes" defaultValue="Contrato com reajuste anual pelo índice acordado entre as partes." />
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
