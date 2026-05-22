import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createZodFormHandler } from "../../../lib/zod-form";
import { createOwnerSchema } from "../../../validations/admin-forms";

export default function CreateOwners() {
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6">
            <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
                <ChevronLeft />
                Voltar
            </Button>

            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Proprietário</h2>
                <p className="text-sm text-muted-foreground">Cadastre os dados do proprietário de acordo com a tabela Owner.</p>
            </div>

            <form className="space-y-6" onSubmit={createZodFormHandler(createOwnerSchema)}>
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
                            <Label htmlFor="owner-cpf">CPF/CNPJ</Label>
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
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Endereço</CardTitle>
                        <CardDescription>Campo opcional usado no cadastro do proprietário.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="owner-address">Endereço</Label>
                            <Textarea id="owner-address" placeholder="Rua, número, bairro, cidade e estado." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit">Salvar proprietário</Button>
                </div>
            </form>
        </div>
    );
}
