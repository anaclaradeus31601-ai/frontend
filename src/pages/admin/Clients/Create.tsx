import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../../types/database";
import { createZodFormHandler } from "../../../lib/zod-form";
import { createClientSchema } from "../../../validations/admin-forms";

export default function CreateClients() {
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6">
            <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
                <ChevronLeft />
                Voltar
            </Button>

            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Cliente</h2>
                <p className="text-sm text-muted-foreground">Cadastre um novo cliente de acordo com os campos da tabela User.</p>
            </div>

            <form className="space-y-6" onSubmit={createZodFormHandler(createClientSchema)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Dados pessoais</CardTitle>
                        <CardDescription>Informações básicas para identificar o cliente.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="client-name">Nome</Label>
                            <Input id="client-name" placeholder="João da Silva" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-email">E-mail</Label>
                            <Input id="client-email" type="email" placeholder="cliente@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-password">Senha</Label>
                            <Input id="client-password" type="password" placeholder="Senha inicial" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-phone">Telefone</Label>
                            <Input id="client-phone" placeholder="(11) 99999-9999" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Acesso e perfil</CardTitle>
                        <CardDescription>Defina o papel, avatar e status de verificação do usuário.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Select defaultValue={UserRole.CLIENT}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={UserRole.CLIENT}>Cliente</SelectItem>
                                    <SelectItem value={UserRole.REALTOR}>Corretor</SelectItem>
                                    <SelectItem value={UserRole.ADMIN}>Administrador</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>E-mail verificado</Label>
                            <Select defaultValue="false">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="true">Sim</SelectItem>
                                    <SelectItem value="false">Não</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-avatar">Avatar</Label>
                            <Input id="client-avatar" placeholder="https://..." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit">Salvar cliente</Button>
                </div>
            </form>
        </div>
    );
}
