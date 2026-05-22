import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function IndexRealtors() {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
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
                    <Button className="ml-auto" onClick={() => navigate("/admin/realtors/create")}>Criar Corretor</Button>
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
                                <TableHead className="text-center">Ações</TableHead>
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
                                    <TableCell className="flex justify-center gap-2">
                                        <Button size="icon" variant="outline" onClick={() => navigate(`/admin/realtors/${realtor.id}`)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="outline" onClick={() => navigate(`/admin/realtors/edit/${realtor.id}`)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {
                                realtors.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-4">Nenhum corretor encontrado</TableCell>
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
