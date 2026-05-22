import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";
import { Upload } from "lucide-react";

export default function CreateProperties() {
    return (
        <div className="p-6 space-y-6">
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

            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
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
                                    <SelectItem value="rent">Aluguel</SelectItem>
                                    <SelectItem value="sale">Venda</SelectItem>
                                    <SelectItem value="both">Ambos</SelectItem>
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
                                    <SelectItem value="residential">Residencial</SelectItem>
                                    <SelectItem value="commercial">Comercial</SelectItem>
                                    <SelectItem value="land">Terreno</SelectItem>
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
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Relacionamentos e mídia</CardTitle>
                        <CardDescription>Associe o responsável pelo imóvel e inclua links de apoio.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="property-owner">ID do proprietário</Label>
                            <Input id="property-owner" type="number" min="1" placeholder="1" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-realtor">ID do corretor</Label>
                            <Input id="property-realtor" type="number" min="1" placeholder="1" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-tour">Tour virtual</Label>
                            <Input id="property-tour" placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="property-video">Vídeo</Label>
                            <Input id="property-video" placeholder="https://youtube.com/..." />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="property-images">Imagens</Label>
                            <Input id="property-images" type="file" multiple />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline">Cancelar</Button>
                    <Button type="submit">Salvar imóvel</Button>
                </div>
            </form>
        </div>
    );
}
