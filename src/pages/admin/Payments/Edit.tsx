import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { createZodFormHandler } from "../../../lib/zod-form";
import { editPaymentSchema } from "../../../validations/admin-forms";

export default function EditPayments() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
        <ChevronLeft />
        Voltar
      </Button>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Editar Pagamento</h2>
        <p className="text-sm text-muted-foreground">Atualize os dados do pagamento {id ? `#${id}` : ""}.</p>
      </div>

      <form className="space-y-6" onSubmit={createZodFormHandler(editPaymentSchema)}>
        <Card>
          <CardHeader>
            <CardTitle>Dados do pagamento</CardTitle>
            <CardDescription>Revise cobrança, vencimento e situação financeira.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="payment-client">Cliente</Label>
              <Input id="payment-client" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-contract">Contrato</Label>
              <Input id="payment-contract" defaultValue="Contrato #001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-amount">Valor</Label>
              <Input id="payment-amount" defaultValue="R$ 2.500,00" />
            </div>
            <div className="space-y-2">
              <Label>Método</Label>
              <Select defaultValue="pix">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">Pix</SelectItem>
                  <SelectItem value="credit-card">Cartão</SelectItem>
                  <SelectItem value="bank-slip">Boleto</SelectItem>
                  <SelectItem value="transfer">Transferência</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-due-date">Data de vencimento</Label>
              <Input id="payment-due-date" type="date" defaultValue="2026-05-30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-paid-date">Data de pagamento</Label>
              <Input id="payment-paid-date" type="date" defaultValue="2026-05-25" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select defaultValue="completed">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="refunded">Reembolsado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-reference">Referência</Label>
              <Input id="payment-reference" defaultValue="Maio/2026" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="payment-notes">Observações</Label>
              <Textarea id="payment-notes" defaultValue="Pagamento recebido com comprovante enviado pelo cliente." />
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
