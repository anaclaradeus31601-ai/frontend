import { Trash2, Pencil, Eye, Search } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { Button } from "#components/ui/button";
import { Input } from '#components/ui/input';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
export default function IndexOwners() {


    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    let owners = [
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
            {
                id: 4,
                name: "John Doe 4",
                phone: "(36) 13344-9999",
                email: "FtM3Y@example.com",
                cpf: "333.333.333-00",
            },
        ];

        if (searchTerm) {
            owners = owners.filter((owner) =>
                owner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                owner.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                owner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                owner.cpf.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    return (

        <div className="p-6 max-w-full mx-auto space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Proprietários</h2>
            <div className="flex gap-4">
                <Input onChange={(e) => setSearchTerm(e.target.value)} type="text" className="w-60" placeholder="Buscar proprietário..."></Input>
                <Button><Search></Search></Button>
                <Button className="ml-auto" onClick={() => navigate("/admin/owners/create")}>Criar Proprietário</Button>
            </div>
            <div className="border rounded-2xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-25 text-center">Id</TableHead>
                            <TableHead className="w-25 text-center">Nome</TableHead>
                            <TableHead className="w-25 text-center">Telefone</TableHead>
                            <TableHead className="w-25 text-center">Email</TableHead>
                            <TableHead className="w-25 text-center">CPF</TableHead>
                            <TableHead className="w-25 text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {owners.map((owner) => (
                            <TableRow key={owner.id}>
                                <TableCell className="font-medium text-center">{owner.id}</TableCell>
                                <TableCell className="font-medium text-center">{owner.name}</TableCell>
                                <TableCell className="font-medium text-center">{owner.phone}</TableCell>
                                <TableCell className="font-medium text-center">{owner.email}</TableCell>
                                <TableCell className="font-medium text-center">{owner.cpf}</TableCell>
                                <TableCell className="flex justify-center gap-2">
                                    <Button size="icon" variant="outline" onClick={() => navigate(`/admin/owners/${owner.id}`)}>
                                        <Eye className="h-4 w-4" />
                                    </Button>

                                    <Button size="icon" variant="outline" onClick={() => navigate(`/admin/owners/edit/${owner.id}`)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    <Button size="icon" variant="destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {owners.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center p-4">
                                    Nenhum proprietário encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>
            </div>
        </div>

    );
}
