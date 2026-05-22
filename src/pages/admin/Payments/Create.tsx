import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RelationSelect } from "#components/admin/relation-select";
import { useContracts, useUsers } from "../../../hooks";
import { PaymentStatus } from "../../../types/database";
import { createZodFormHandler } from "../../../lib/zod-form";
import { createPaymentSchema } from "../../../validations/admin-forms";

export default function CreatePayments() {
    const navigate = useNavigate();
    const { data: contracts } = useContracts();
    const { data: users } = useUsers();

    const contractOptions = contracts.map((contract) => ({
        id: contract.id,
        label: contract.property?.title ?? `Contrato ${contract.id}`,
        description: contract.client?.name ?? contract.status,
    }));

    const userOptions = users.map((user) => ({
        id: user.id,
        label: user.name,
        description: user.email,
    }));

    return (
        <div className="p-6 space-y-6">
            <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
                <ChevronLeft />
                Voltar
            </Button>

            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Pagamento</h2>
                <p className="text-sm text-muted-foreground">Registre um novo pagamento vinculado ao cliente e contrato correspondente.</p>
            </div>

            <form className="space-y-6" onSubmit={createZodFormHandler(createPaymentSchema)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Dados do pagamento</CardTitle>
                        <CardDescription>Preencha valores, vencimento e status atual da cobrança.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <RelationSelect
                            name="payment-contract-id"
                            label="Contrato"
                            placeholder="Selecione um contrato"
                            searchPlaceholder="Buscar contrato por imóvel, cliente ou ID"
                            options={contractOptions}
                        />
                        <RelationSelect
                            name="payment-user-id"
                            label="Usuário"
                            placeholder="Selecione um usuário"
                            searchPlaceholder="Buscar usuário por nome, e-mail ou ID"
                            options={userOptions}
                        />
                        <div className="space-y-2">
                            <Label htmlFor="payment-amount">Valor</Label>
                            <Input id="payment-amount" placeholder="R$ 2.500,00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-due-date">Data de vencimento</Label>
                            <Input id="payment-due-date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-paid-date">Data de pagamento</Label>
                            <Input id="payment-paid-date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select defaultValue={PaymentStatus.PENDING}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={PaymentStatus.PENDING}>Pendente</SelectItem>
                                    <SelectItem value={PaymentStatus.COMPLETED}>Concluído</SelectItem>
                                    <SelectItem value={PaymentStatus.FAILED}>Falhou</SelectItem>
                                    <SelectItem value={PaymentStatus.REFUNDED}>Reembolsado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-stripe-intent">Stripe Payment Intent</Label>
                            <Input id="payment-stripe-intent" placeholder="pi_..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-stripe-invoice">Stripe Invoice</Label>
                            <Input id="payment-stripe-invoice" placeholder="in_..." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit">Salvar pagamento</Button>
                </div>
            </form>
        </div>
    );
}
