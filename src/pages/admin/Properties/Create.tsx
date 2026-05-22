import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { ChevronLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RelationSelect } from "#components/admin/relation-select";
import { useOwners, useRealtors } from "../../../hooks";
import { PropertyStatus, PropertyType, TransactionType } from "../../../types/database";
import { useForm } from "../../../hooks/use-form";
import { createPropertyFormSchema, type CreatePropertyFormData } from "../../../validations/forms";

export default function CreateProperties() {
    const navigate = useNavigate();
    const { data: owners } = useOwners();
    const { data: realtors } = useRealtors();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(createPropertyFormSchema);

    const onSubmit = async (data: CreatePropertyFormData) => {
        try {
            console.log("Property data:", data);
            // TODO: Integrar com API
            // const response = await apiRequest("/admin/properties", { method: "POST", body: JSON.stringify(data) });
            navigate(-1);
        } catch (error) {
            console.error("Failed to create property:", error);
        }
    }

    const ownerOptions = owners.map((owner) => ({
        id: owner.id,
        label: owner.name,
        description: owner.email,
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

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">Criar Imóvel</h2>
                    <p className="text-sm text-muted-foreground">Preencha os dados do imóvel com endereço, valores e características.</p>
                </div>
                <Button type="button" variant="outline">
                    <Upload />
                    Importar planilha de imóveis
                </Button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Informações principais</CardTitle>
                        <CardDescription>Título, tipo de negociação e resumo do imóvel.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="title">Título *</Label>
                            <Input
                                id="title"
                                placeholder="Casa moderna com piscina"
                                {...register("title")}
                                className={errors.title ? "border-red-500" : ""}
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Tipo de negociação *</Label>
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
                            <Label>Categoria *</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={PropertyType.RESIDENTIAL}>Residencial</SelectItem>
                                    <SelectItem value={PropertyType.COMMERCIAL}>Comercial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Status *</Label>
                            <Select defaultValue={PropertyStatus.AVAILABLE}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={PropertyStatus.AVAILABLE}>Disponível</SelectItem>
                                    <SelectItem value={PropertyStatus.RENTED}>Alugado</SelectItem>
                                    <SelectItem value={PropertyStatus.SOLD}>Vendido</SelectItem>
                                    <SelectItem value={PropertyStatus.PENDING}>Pendente</SelectItem>
                                    <SelectItem value={PropertyStatus.MAINTENANCE}>Manutenção</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rentPrice">Valor do aluguel</Label>
                            <Input
                                id="rentPrice"
                                placeholder="R$ 2.500,00"
                                {...register("rentPrice")}
                                className={errors.rentPrice ? "border-red-500" : ""}
                            />
                            {errors.rentPrice && <p className="text-sm text-red-500">{errors.rentPrice.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salePrice">Valor da venda</Label>
                            <Input
                                id="salePrice"
                                placeholder="R$ 750.000,00"
                                {...register("salePrice")}
                                className={errors.salePrice ? "border-red-500" : ""}
                            />
                            {errors.salePrice && <p className="text-sm text-red-500">{errors.salePrice.message}</p>}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description">Descrição *</Label>
                            <Textarea
                                id="description"
                                placeholder="Destaques do imóvel, diferenciais e acabamento."
                                {...register("description")}
                                className={errors.description ? "border-red-500" : ""}
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Características e endereço</CardTitle>
                        <CardDescription>Defina métricas do imóvel e localização completa.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-4">
                        <div className="space-y-2">
                            <Label htmlFor="bedrooms">Quartos *</Label>
                            <Input
                                id="bedrooms"
                                type="number"
                                min="0"
                                placeholder="3"
                                {...register("bedrooms")}
                                className={errors.bedrooms ? "border-red-500" : ""}
                            />
                            {errors.bedrooms && <p className="text-sm text-red-500">{errors.bedrooms.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bathrooms">Banheiros *</Label>
                            <Input
                                id="bathrooms"
                                type="number"
                                min="0"
                                placeholder="2"
                                {...register("bathrooms")}
                                className={errors.bathrooms ? "border-red-500" : ""}
                            />
                            {errors.bathrooms && <p className="text-sm text-red-500">{errors.bathrooms.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="garages">Garagens *</Label>
                            <Input
                                id="garages"
                                type="number"
                                min="0"
                                placeholder="2"
                                {...register("garages")}
                                className={errors.garages ? "border-red-500" : ""}
                            />
                            {errors.garages && <p className="text-sm text-red-500">{errors.garages.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="area">Área (m²) *</Label>
                            <Input
                                id="area"
                                type="number"
                                min="0"
                                placeholder="150"
                                {...register("area")}
                                className={errors.area ? "border-red-500" : ""}
                            />
                            {errors.area && <p className="text-sm text-red-500">{errors.area.message}</p>}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="street">Rua *</Label>
                            <Input
                                id="street"
                                placeholder="Av. Beira Mar"
                                {...register("street")}
                                className={errors.street ? "border-red-500" : ""}
                            />
                            {errors.street && <p className="text-sm text-red-500">{errors.street.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="number">Número *</Label>
                            <Input
                                id="number"
                                placeholder="2500"
                                {...register("number")}
                                className={errors.number ? "border-red-500" : ""}
                            />
                            {errors.number && <p className="text-sm text-red-500">{errors.number.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="complement">Complemento</Label>
                            <Input
                                id="complement"
                                placeholder="Apto 302"
                                {...register("complement")}
                                className={errors.complement ? "border-red-500" : ""}
                            />
                            {errors.complement && <p className="text-sm text-red-500">{errors.complement.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="neighborhood">Bairro *</Label>
                            <Input
                                id="neighborhood"
                                placeholder="Jurerê"
                                {...register("neighborhood")}
                                className={errors.neighborhood ? "border-red-500" : ""}
                            />
                            {errors.neighborhood && <p className="text-sm text-red-500">{errors.neighborhood.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">Cidade *</Label>
                            <Input
                                id="city"
                                placeholder="Florianópolis"
                                {...register("city")}
                                className={errors.city ? "border-red-500" : ""}
                            />
                            {errors.city && <p className="text-sm text-red-500">{errors.city.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">Estado *</Label>
                            <Input
                                id="state"
                                placeholder="SC"
                                {...register("state")}
                                className={errors.state ? "border-red-500" : ""}
                            />
                            {errors.state && <p className="text-sm text-red-500">{errors.state.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zipCode">CEP *</Label>
                            <Input
                                id="zipCode"
                                placeholder="00000-000"
                                {...register("zipCode")}
                                className={errors.zipCode ? "border-red-500" : ""}
                            />
                            {errors.zipCode && <p className="text-sm text-red-500">{errors.zipCode.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">País *</Label>
                            <Input
                                id="country"
                                defaultValue="Brasil"
                                {...register("country")}
                                className={errors.country ? "border-red-500" : ""}
                            />
                            {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Valores adicionais e metadados</CardTitle>
                        <CardDescription>Preencha taxas, localização e destaque do anúncio.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="condominiumFee">Condomínio</Label>
                            <Input
                                id="condominiumFee"
                                placeholder="R$ 800,00"
                                {...register("condominiumFee")}
                                className={errors.condominiumFee ? "border-red-500" : ""}
                            />
                            {errors.condominiumFee && <p className="text-sm text-red-500">{errors.condominiumFee.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="iptu">IPTU</Label>
                            <Input
                                id="iptu"
                                placeholder="R$ 1.200,00"
                                {...register("iptu")}
                                className={errors.iptu ? "border-red-500" : ""}
                            />
                            {errors.iptu && <p className="text-sm text-red-500">{errors.iptu.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="latitude">Latitude</Label>
                            <Input
                                id="latitude"
                                type="number"
                                step="any"
                                placeholder="-27.5794"
                                {...register("latitude")}
                                className={errors.latitude ? "border-red-500" : ""}
                            />
                            {errors.latitude && <p className="text-sm text-red-500">{errors.latitude.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="longitude">Longitude</Label>
                            <Input
                                id="longitude"
                                type="number"
                                step="any"
                                placeholder="-48.5499"
                                {...register("longitude")}
                                className={errors.longitude ? "border-red-500" : ""}
                            />
                            {errors.longitude && <p className="text-sm text-red-500">{errors.longitude.message}</p>}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Destaque</Label>
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
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Relacionamentos e mídia</CardTitle>
                        <CardDescription>Associe o responsável pelo imóvel e inclua links de apoio.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <RelationSelect
                            name="ownerId"
                            label="Proprietário *"
                            placeholder="Selecione um proprietário"
                            searchPlaceholder="Buscar proprietário por nome, e-mail ou ID"
                            options={ownerOptions}
                        />
                        <RelationSelect
                            name="realtorId"
                            label="Corretor"
                            placeholder="Selecione um corretor"
                            searchPlaceholder="Buscar corretor por nome, e-mail ou ID"
                            options={realtorOptions}
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar imóvel"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
