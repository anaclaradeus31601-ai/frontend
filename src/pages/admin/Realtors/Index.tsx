import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useState } from "react";


export default function IndexRealtors() {

    const [search, setSearch] = useState("");
    let realtors = [
        {
            id: 1,
            name: "John Doe",
            phone: "(16) 99999-9999",
            email: "FtM3Y@example.com",
            cpf: "123.456.789-00",
        },
        {
            id: 2,
            name: "John Doe 2",
            phone: "(19) 99999-9999",
            email: "FtM3Y@example.com",
            cpf: "123.456.789-00",
        },
        {
            id: 3,
            name: "John Doe 3",
            phone: "(19) 99999-9999",
            email: "FtM3Y@example.com",
            cpf: "123.456.789-00",
        },
    ];

    if (search !== "") {
        realtors = realtors.filter((realtor) =>
            realtor.name.toLowerCase().includes(search.toLowerCase()) ||
            realtor.phone.toLowerCase().includes(search.toLowerCase()) ||
            realtor.cpf.toLowerCase().includes(search.toLowerCase()) ||
            realtor.email.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold tracking-tight">Corretores</h2>
            <div className="space-y-4">
                <div className="flex mt-2">
                    <Input className="w-60" onChange={(e) => setSearch(e.target.value)} placeholder="Buscar Corretor"></Input>
                    <Button className="ml-auto">Criar Corretor</Button>
                </div>
                <div className="border rounded-2xl">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Foto</TableHead>
                                <TableHead className="text-center">Nome</TableHead>
                                <TableHead className="text-center">Telefone</TableHead>
                                <TableHead className="text-center">email</TableHead>
                                <TableHead className="text-center">cpf</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {realtors.map((realtor) => (
                                <TableRow key={realtor.id}>
                                    <TableCell className="flex items-center justify-center">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>{realtor.name.slice(0, 1)}</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="text-center">{realtor.name}</TableCell>
                                    <TableCell className="text-center">{realtor.phone}</TableCell>
                                    <TableCell className="text-center">{realtor.email}</TableCell>
                                    <TableCell className="text-center">{realtor.cpf}</TableCell>
                                </TableRow>
                            ))}
                            {
                                realtors.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-4">Nenhum corretor encontrado</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}