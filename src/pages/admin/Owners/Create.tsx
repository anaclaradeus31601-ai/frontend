import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Textarea } from "#components/ui/textarea";

export default function CreateOwners() {
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Proprietário</h2>
                <p className="text-sm text-muted-foreground">Cadastre os dados do proprietário responsável pelo imóvel.</p>
            </div>

            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <Card>
                    <CardHeader>
                        <CardTitle>Dados principais</CardTitle>
                        <CardDescription>Informações pessoais e documentos para o cadastro.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="owner-name">Nome completo</Label>
                            <Input id="owner-name" placeholder="Maria Oliveira" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="owner-cpf">CPF</Label>
                            <Input id="owner-cpf" placeholder="000.000.000-00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="owner-email">E-mail</Label>
                            <Input id="owner-email" type="email" placeholder="proprietario@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="owner-phone">Telefone</Label>
                            <Input id="owner-phone" placeholder="(11) 99999-9999" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="owner-rg">RG</Label>
                            <Input id="owner-rg" placeholder="00.000.000-0" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Endereço e observações</CardTitle>
                        <CardDescription>Use esse bloco para o endereço principal e anotações do atendimento.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="owner-street">Rua</Label>
                            <Input id="owner-street" placeholder="Rua das Palmeiras" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="owner-number">Número</Label>
                            <Input id="owner-number" placeholder="123" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="owner-neighborhood">Bairro</Label>
                            <Input id="owner-neighborhood" placeholder="Centro" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="owner-city">Cidade</Label>
                            <Input id="owner-city" placeholder="Florianópolis" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="owner-state">Estado</Label>
                            <Input id="owner-state" placeholder="SC" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="owner-notes">Observações</Label>
                            <Textarea id="owner-notes" placeholder="Dados bancários, preferências de contato ou anotações internas." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline">Cancelar</Button>
                    <Button type="submit">Salvar proprietário</Button>
                </div>
            </form>
        </div>
    );
}
