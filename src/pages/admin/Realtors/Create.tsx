import { Button } from "#components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { Textarea } from "#components/ui/textarea";

export default function CreateRealtors() {
    return (
        <div className="p-6 space-y-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Criar Corretor</h2>
                <p className="text-sm text-muted-foreground">Cadastre um corretor com dados profissionais, contato e área de atuação.</p>
            </div>

            <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
                <Card>
                    <CardHeader>
                        <CardTitle>Perfil profissional</CardTitle>
                        <CardDescription>Dados obrigatórios para identificação do corretor no sistema.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="realtor-name">Nome completo</Label>
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
                            <Label htmlFor="realtor-cpf">CPF</Label>
                            <Input id="realtor-cpf" placeholder="000.000.000-00" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="realtor-creci">CRECI</Label>
                            <Input id="realtor-creci" placeholder="123456-F" />
                        </div>
                        <div className="space-y-2">
                            <Label>Especialidade</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rent">Locação</SelectItem>
                                    <SelectItem value="sale">Venda</SelectItem>
                                    <SelectItem value="high-standard">Alto padrão</SelectItem>
                                    <SelectItem value="commercial">Comercial</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="realtor-photo">Foto de perfil</Label>
                            <Input id="realtor-photo" type="file" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="realtor-bio">Bio</Label>
                            <Textarea id="realtor-bio" placeholder="Resumo profissional, região de atuação e diferenciais no atendimento." />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline">Cancelar</Button>
                    <Button type="submit">Salvar corretor</Button>
                </div>
            </form>
        </div>
    );
}
