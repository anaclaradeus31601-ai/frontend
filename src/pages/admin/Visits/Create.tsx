import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";

export default function CreateVisits() {
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Visita</h2>
                <p className="text-sm text-muted-foreground">Agende uma visita com cliente, corretor, imóvel e instruções do atendimento.</p>
            </div>

            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <Card>
                    <CardHeader>
                        <CardTitle>Agendamento</CardTitle>
                        <CardDescription>Escolha os envolvidos e defina a data da visita.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="visit-property">Imóvel</Label>
                            <Input id="visit-property" placeholder="Apartamento 101" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="visit-client">Cliente</Label>
                            <Input id="visit-client" placeholder="João Silva" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="visit-realtor">Corretor</Label>
                            <Input id="visit-realtor" placeholder="Carlos Pereira" />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select>
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
                            <Input id="visit-date" type="date" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="visit-time">Hora</Label>
                            <Input id="visit-time" type="time" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="visit-notes">Observações</Label>
                            <Textarea id="visit-notes" placeholder="Ponto de encontro, documentos necessários ou instruções especiais." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline">Cancelar</Button>
                    <Button type="submit">Salvar visita</Button>
                </div>
            </form>
        </div>
    );
}
