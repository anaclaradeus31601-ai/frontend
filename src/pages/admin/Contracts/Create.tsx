import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";

export default function CreateContracts() {
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Contrato</h2>
                <p className="text-sm text-muted-foreground">Monte um novo contrato com cliente, imóvel, período e valor acordado.</p>
            </div>

            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <Card>
                    <CardHeader>
                        <CardTitle>Informações contratuais</CardTitle>
                        <CardDescription>Dados principais do vínculo e da vigência.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="contract-client">Cliente</Label>
                            <Input id="contract-client" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contract-property">Imóvel</Label>
                            <Input id="contract-property" placeholder="Casa moderna com piscina" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contract-realtor">Corretor</Label>
                            <Input id="contract-realtor" placeholder="Ana Clara" />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select>
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
                            <Input id="contract-start-date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contract-end-date">Data de vencimento</Label>
                            <Input id="contract-end-date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contract-value">Valor</Label>
                            <Input id="contract-value" placeholder="R$ 2.500,00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contract-doc-url">URL do documento</Label>
                            <Input id="contract-doc-url" placeholder="https://..." />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="contract-notes">Cláusulas e observações</Label>
                            <Textarea id="contract-notes" placeholder="Anotações internas, garantias ou detalhes importantes da negociação." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline">Cancelar</Button>
                    <Button type="submit">Salvar contrato</Button>
                </div>
            </form>
        </div>
    );
}
