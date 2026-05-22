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
import { createZodFormHandler } from "../../../lib/zod-form";
import { createPropertySchema } from "../../../validations/admin-forms";

export default function CreateProperties() {
    const navigate = useNavigate();
    const { data: owners } = useOwners();
    const { data: realtors } = useRealtors();

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

            <form className="space-y-6" onSubmit={createZodFormHandler(createPropertySchema)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Informações principais</CardTitle>
                        <CardDescription>Título, tipo de negociação e resumo do imóvel.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="property-title">Título</Label>
                            <Input id="property-title" placeholder="Casa moderna com piscina" />
                        </div>
                        <div className="space-y-2">
                            <Label>Tipo de negociação</Label>
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
                            <Label>Categoria</Label>
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
                            <Label>Status</Label>
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
                            <Label htmlFor="property-rent-price">Valor do aluguel</Label>
                            <Input id="property-rent-price" placeholder="R$ 2.500,00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-sale-price">Valor da venda</Label>
                            <Input id="property-sale-price" placeholder="R$ 750.000,00" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="property-description">Descrição</Label>
                            <Textarea id="property-description" placeholder="Destaques do imóvel, diferenciais e acabamento." />
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
                            <Label htmlFor="property-bedrooms">Quartos</Label>
                            <Input id="property-bedrooms" type="number" min="0" placeholder="3" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-bathrooms">Banheiros</Label>
                            <Input id="property-bathrooms" type="number" min="0" placeholder="2" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-garages">Garagens</Label>
                            <Input id="property-garages" type="number" min="0" placeholder="2" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-area">Área (m²)</Label>
                            <Input id="property-area" type="number" min="0" placeholder="150" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="property-street">Rua</Label>
                            <Input id="property-street" placeholder="Av. Beira Mar" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-number">Número</Label>
                            <Input id="property-number" placeholder="2500" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-complement">Complemento</Label>
                            <Input id="property-complement" placeholder="Apto 302" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-neighborhood">Bairro</Label>
                            <Input id="property-neighborhood" placeholder="Jurerê" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-city">Cidade</Label>
                            <Input id="property-city" placeholder="Florianópolis" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-state">Estado</Label>
                            <Input id="property-state" placeholder="SC" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-zip-code">CEP</Label>
                            <Input id="property-zip-code" placeholder="00000-000" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-country">País</Label>
                            <Input id="property-country" defaultValue="Brasil" />
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
                            <Label htmlFor="property-condominium-fee">Condomínio</Label>
                            <Input id="property-condominium-fee" placeholder="R$ 800,00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-iptu">IPTU</Label>
                            <Input id="property-iptu" placeholder="R$ 1.200,00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-latitude">Latitude</Label>
                            <Input id="property-latitude" type="number" step="any" placeholder="-27.5794" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-longitude">Longitude</Label>
                            <Input id="property-longitude" type="number" step="any" placeholder="-48.5499" />
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
                            name="property-owner-id"
                            label="Proprietário"
                            placeholder="Selecione um proprietário"
                            searchPlaceholder="Buscar proprietário por nome, e-mail ou ID"
                            options={ownerOptions}
                        />
                        <RelationSelect
                            name="property-realtor-id"
                            label="Corretor"
                            placeholder="Selecione um corretor"
                            searchPlaceholder="Buscar corretor por nome, e-mail ou ID"
                            options={realtorOptions}
                        />
                        <div className="space-y-2">
                            <Label htmlFor="property-tour">Tour virtual</Label>
                            <Input id="property-tour" placeholder="https://..." />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="property-images">Imagens</Label>
                            <Textarea id="property-images" placeholder="Uma URL por linha." />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="property-videos">Vídeos</Label>
                            <Textarea id="property-videos" placeholder="Uma URL por linha." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit">Salvar imóvel</Button>
                </div>
            </form>
        </div>
    );
}
