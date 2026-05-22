import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/use-form";
import { createOwnerFormSchema, type CreateOwnerFormData } from "../../../validations/forms";

export default function CreateOwners() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(createOwnerFormSchema);

    const onSubmit = async (data: CreateOwnerFormData) => {
        try {
            // TODO: Integrar com API
            console.log("Owner data:", data);
            // const response = await apiRequest("/admin/owners", { method: "POST", body: JSON.stringify(data) });
            navigate(-1);
        } catch (error) {
            console.error("Failed to create owner:", error);
        }
    }

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

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Dados principais</CardTitle>
                        <CardDescription>Informações pessoais e documentos para o cadastro.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="name">Nome completo *</Label>
                            <Input 
                                id="name" 
                                placeholder="Maria Oliveira"
                                {...register("name")}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cpfCnpj">CPF/CNPJ *</Label>
                            <Input 
                                id="cpfCnpj" 
                                placeholder="000.000.000-00"
                                {...register("cpfCnpj")}
                                className={errors.cpfCnpj ? "border-red-500" : ""}
                            />
                            {errors.cpfCnpj && <p className="text-sm text-red-500">{errors.cpfCnpj.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail *</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="proprietario@email.com"
                                {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone *</Label>
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
                        <CardTitle>Endereço</CardTitle>
                        <CardDescription>Campo opcional usado no cadastro do proprietário.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label htmlFor="address">Endereço</Label>
                            <Textarea 
                                id="address" 
                                placeholder="Rua, número, bairro, cidade e estado."
                                {...register("address")}
                                className={errors.address ? "border-red-500" : ""}
                            />
                            {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar proprietário"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
