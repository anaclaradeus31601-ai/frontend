import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";

export default function CreateClients() {
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Cliente</h2>
                <p className="text-sm text-muted-foreground">Cadastre um novo cliente com os dados de contato e preferências de busca.</p>
            </div>

            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <Card>
                    <CardHeader>
                        <CardTitle>Dados pessoais</CardTitle>
                        <CardDescription>Informações básicas para identificar o cliente.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="client-name">Nome completo</Label>
                            <Input id="client-name" placeholder="João da Silva" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-cpf">CPF</Label>
                            <Input id="client-cpf" placeholder="000.000.000-00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-birth">Data de nascimento</Label>
                            <Input id="client-birth" type="date" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contato e interesse</CardTitle>
                        <CardDescription>Defina como esse cliente quer ser atendido e o tipo de imóvel desejado.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="client-email">E-mail</Label>
                            <Input id="client-email" type="email" placeholder="cliente@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-phone">Telefone</Label>
                            <Input id="client-phone" placeholder="(11) 99999-9999" />
                        </div>
                        <div className="space-y-2">
                            <Label>Tipo de interesse</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rent">Aluguel</SelectItem>
                                    <SelectItem value="sale">Compra</SelectItem>
                                    <SelectItem value="both">Ambos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Tipo de imóvel</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="house">Casa</SelectItem>
                                    <SelectItem value="apartment">Apartamento</SelectItem>
                                    <SelectItem value="commercial">Comercial</SelectItem>
                                    <SelectItem value="land">Terreno</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-budget">Faixa de orçamento</Label>
                            <Input id="client-budget" placeholder="R$ 350.000,00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="client-city">Cidade de interesse</Label>
                            <Input id="client-city" placeholder="Florianópolis" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="client-notes">Observações</Label>
                            <Textarea id="client-notes" placeholder="Preferências, urgência no atendimento e detalhes adicionais." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline">Cancelar</Button>
                    <Button type="submit">Salvar cliente</Button>
                </div>
            </form>
        </div>
    );
}
