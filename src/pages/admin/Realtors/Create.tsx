import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../../types/database";
import { createZodFormHandler } from "../../../lib/zod-form";
import { createRealtorSchema } from "../../../validations/admin-forms";

export default function CreateRealtors() {
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6">
            <Button type="button" variant="ghost" className="w-fit px-0" onClick={() => navigate(-1)}>
                <ChevronLeft />
                Voltar
            </Button>

            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Corretor</h2>
                <p className="text-sm text-muted-foreground">Cadastre um usuário com role de corretor.</p>
            </div>

            <form className="space-y-6" onSubmit={createZodFormHandler(createRealtorSchema)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Perfil profissional</CardTitle>
                        <CardDescription>Dados obrigatórios para identificação do corretor no sistema.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="realtor-name">Nome</Label>
                            <Input id="realtor-name" placeholder="Ana Costa" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="realtor-email">E-mail</Label>
                            <Input id="realtor-email" type="email" placeholder="corretor@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="realtor-phone">Telefone</Label>
                            <Input id="realtor-phone" placeholder="(11) 99999-9999" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="realtor-password">Senha</Label>
                            <Input id="realtor-password" type="password" placeholder="Senha inicial" />
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Select defaultValue={UserRole.REALTOR}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={UserRole.REALTOR}>Corretor</SelectItem>
                                    <SelectItem value={UserRole.CLIENT}>Cliente</SelectItem>
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
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="realtor-avatar">Avatar</Label>
                            <Input id="realtor-avatar" placeholder="https://..." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit">Salvar corretor</Button>
                </div>
            </form>
        </div>
    );
}
