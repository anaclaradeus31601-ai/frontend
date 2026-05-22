import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/use-form";
import { createClientFormSchema, type CreateClientFormData } from "../../../validations/forms";
import { UserRole } from "../../../types/database";

export default function CreateClients() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(createClientFormSchema);

    const onSubmit = async (data: CreateClientFormData) => {
        try {
            console.log("Client data:", data);
            // TODO: Integrar com API
            // const response = await apiRequest("/admin/clients", { method: "POST", body: JSON.stringify(data) });
            navigate(-1);
        } catch (error) {
            console.error("Failed to create client:", error);
        }
    }

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

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Dados pessoais</CardTitle>
                        <CardDescription>Informações básicas para identificar o cliente.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome *</Label>
                            <Input
                                id="name"
                                placeholder="João da Silva"
                                {...register("name")}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail *</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="cliente@email.com"
                                {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha *</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Senha inicial"
                                {...register("password")}
                                className={errors.password ? "border-red-500" : ""}
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                                id="phone"
                                placeholder="(11) 99999-9999"
                                {...register("phone")}
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
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
                            <Label>Role *</Label>
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
                            <Label htmlFor="avatar">Avatar</Label>
                            <Input
                                id="avatar"
                                placeholder="https://..."
                                {...register("avatar")}
                                className={errors.avatar ? "border-red-500" : ""}
                            />
                            {errors.avatar && <p className="text-sm text-red-500">{errors.avatar.message}</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar cliente"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
