import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RelationSelect } from "#components/admin/relation-select";
import { useClients, useProperties, useRealtors } from "../../../hooks";
import { VisitStatus } from "../../../types/database";
import { createZodFormHandler } from "../../../lib/zod-form";
import { createVisitSchema } from "../../../validations/admin-forms";

export default function CreateVisits() {
    const navigate = useNavigate();
    const { data: properties } = useProperties();
    const { data: clients } = useClients();
    const { data: realtors } = useRealtors();

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

    const realtorOptions = realtors.map((realtor) => ({
        id: realtor.id,
        label: realtor.name,
        description: realtor.email,
    }));

    return (
        <div className="p-6 space-y-6">
            <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
                <ChevronLeft />
                Voltar
            </Button>

            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Visita</h2>
                <p className="text-sm text-muted-foreground">Agende uma visita com cliente, corretor, imóvel e instruções do atendimento.</p>
            </div>

            <form className="space-y-6" onSubmit={createZodFormHandler(createVisitSchema)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Agendamento</CardTitle>
                        <CardDescription>Escolha os envolvidos e defina a data da visita.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <RelationSelect
                            name="visit-property-id"
                            label="Imóvel"
                            placeholder="Selecione um imóvel"
                            searchPlaceholder="Buscar imóvel por título, cidade ou ID"
                            options={propertyOptions}
                        />
                        <RelationSelect
                            name="visit-client-id"
                            label="Cliente"
                            placeholder="Selecione um cliente"
                            searchPlaceholder="Buscar cliente por nome, e-mail ou ID"
                            options={clientOptions}
                        />
                        <RelationSelect
                            name="visit-realtor-id"
                            label="Corretor"
                            placeholder="Selecione um corretor"
                            searchPlaceholder="Buscar corretor por nome, e-mail ou ID"
                            options={realtorOptions}
                        />
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select defaultValue={VisitStatus.SCHEDULED}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={VisitStatus.SCHEDULED}>Agendada</SelectItem>
                                    <SelectItem value={VisitStatus.COMPLETED}>Concluída</SelectItem>
                                    <SelectItem value={VisitStatus.CANCELLED}>Cancelada</SelectItem>
                                    <SelectItem value={VisitStatus.NO_SHOW}>Não compareceu</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="visit-scheduled-at">Data e hora</Label>
                            <Input id="visit-scheduled-at" type="datetime-local" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="visit-duration">Duração em minutos</Label>
                            <Input id="visit-duration" type="number" min="0" placeholder="60" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="visit-notes">Observações</Label>
                            <Textarea id="visit-notes" placeholder="Ponto de encontro, documentos necessários ou instruções especiais." />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="visit-feedback">Feedback</Label>
                            <Textarea id="visit-feedback" placeholder="Feedback após a visita." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit">Salvar visita</Button>
                </div>
            </form>
        </div>
    );
}
