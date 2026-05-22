import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RelationSelect } from "#components/admin/relation-select";
import { useClients, useProperties } from "../../../hooks";
import { ContractStatus, TransactionType } from "../../../types/database";
import { createZodFormHandler } from "../../../lib/zod-form";
import { createContractSchema } from "../../../validations/admin-forms";

export default function CreateContracts() {
    const navigate = useNavigate();
    const { data: properties } = useProperties();
    const { data: clients } = useClients();

    const propertyOptions = properties.map((property) => ({
        id: property.id,
        label: property.title,
        description: `${property.city} - ${property.neighborhood}`,
    }));

    const clientOptions = clients.map((client) => ({
        id: client.id,
        label: client.name,
        description: client.email,
    }));

    return (
        <div className="p-6 space-y-6">
            <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
                <ChevronLeft />
                Voltar
            </Button>

            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Contrato</h2>
                <p className="text-sm text-muted-foreground">Monte um novo contrato com cliente, imóvel, período e valor acordado.</p>
            </div>

            <form className="space-y-6" onSubmit={createZodFormHandler(createContractSchema)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Informações contratuais</CardTitle>
                        <CardDescription>Dados principais do vínculo e da vigência.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <RelationSelect
                            name="contract-property-id"
                            label="Imóvel"
                            placeholder="Selecione um imóvel"
                            searchPlaceholder="Buscar imóvel por título, cidade ou ID"
                            options={propertyOptions}
                        />
                        <RelationSelect
                            name="contract-client-id"
                            label="Cliente"
                            placeholder="Selecione um cliente"
                            searchPlaceholder="Buscar cliente por nome, e-mail ou ID"
                            options={clientOptions}
                        />
                        <div className="space-y-2">
                            <Label>Tipo de transação</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={TransactionType.RENT}>Aluguel</SelectItem>
                                    <SelectItem value={TransactionType.SALE}>Venda</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select defaultValue={ContractStatus.DRAFT}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={ContractStatus.DRAFT}>Rascunho</SelectItem>
                                    <SelectItem value={ContractStatus.ACTIVE}>Ativo</SelectItem>
                                    <SelectItem value={ContractStatus.EXPIRED}>Expirado</SelectItem>
                                    <SelectItem value={ContractStatus.TERMINATED}>Encerrado</SelectItem>
                                    <SelectItem value={ContractStatus.CANCELLED}>Cancelado</SelectItem>
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
                            <Label htmlFor="contract-rent-value">Valor do aluguel</Label>
                            <Input id="contract-rent-value" placeholder="R$ 2.500,00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contract-sale-value">Valor da venda</Label>
                            <Input id="contract-sale-value" placeholder="R$ 750.000,00" />
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
                    <Button type="submit">Salvar contrato</Button>
                </div>
            </form>
        </div>
    );
}
