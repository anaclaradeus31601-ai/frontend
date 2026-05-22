import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";

export default function CreatePayments() {
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Pagamento</h2>
                <p className="text-sm text-muted-foreground">Registre um novo pagamento vinculado ao cliente e contrato correspondente.</p>
            </div>

            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <Card>
                    <CardHeader>
                        <CardTitle>Dados do pagamento</CardTitle>
                        <CardDescription>Preencha valores, vencimento e status atual da cobrança.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="payment-client">Cliente</Label>
                            <Input id="payment-client" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-contract">Contrato</Label>
                            <Input id="payment-contract" placeholder="Contrato #001" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-amount">Valor</Label>
                            <Input id="payment-amount" placeholder="R$ 2.500,00" />
                        </div>
                        <div className="space-y-2">
                            <Label>Método</Label>
                            <Select>
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
                            <Input id="payment-due-date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="payment-paid-date">Data de pagamento</Label>
                            <Input id="payment-paid-date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select>
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
                            <Input id="payment-reference" placeholder="Maio/2026" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="payment-notes">Observações</Label>
                            <Textarea id="payment-notes" placeholder="Anotações sobre repasse, comprovante ou parcelamento." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline">Cancelar</Button>
                    <Button type="submit">Salvar pagamento</Button>
                </div>
            </form>
        </div>
    );
}
