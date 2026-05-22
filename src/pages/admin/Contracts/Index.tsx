import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Separator } from "#components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { Eye, Pencil, Search, Trash2 } from "lucide-react";
import {  useState } from "react";
// import CreateContracts from "./Create";
import { useNavigate } from "react-router-dom";

export default function IndexContracts() {

    const [status, setStatus] = useState("");

    let contracts =[
        {
            id: 7,
            client: "John Doe",
            docUrl: "https://github.com/shadcn",
            startDate: "10/01/2025",
            endDate: "10/01/2026",
            value: 2500,
            status: "ACTIVE",
        },
        {
            id: 6,
            client: "John Doe 2",
            docUrl: "https://github.com/shadcn",
            startDate: "10/01/2025",
            endDate: "10/01/2026",
            value: 2500,
            status: "ACTIVE",
        },
        {
            id: 1,
            client: "John Doe 3",
            docUrl: "https://github.com/shadcn",
            startDate: "10/01/2025",
            endDate: "10/01/2026",
            value: 2500,
            status: "ACTIVE",
        },
        {
            id: 2,
            client: "Maria Silva",
            docUrl: "https://github.com/shadcn",
            startDate: "05/02/2025",
            endDate: "05/12/2025",
            value: 3200,
            status: "EXPIRING",
        },

        {
            id: 3,
            client: "Carlos Souza",
            docUrl: "https://github.com/shadcn",
            startDate: "12/03/2024",
            endDate: "12/03/2025",
            value: 1800,
            status: "EXPIRED",
        },

        {
            id: 4,
            client: "Ana Clara",
            docUrl: "https://github.com/shadcn",
            startDate: "01/04/2025",
            endDate: "01/04/2026",
            value: 4100,
            status: "ACTIVE",
        },

        {
            id: 5,
            client: "Pedro Santos",
            docUrl: "https://github.com/shadcn",
            startDate: "15/05/2025",
            endDate: "15/11/2025",
            value: 2700,
            status: "CANCELLED",
        },
    ];

    const [search, setSearch] = useState("");

    if(search !== "") {
        contracts = contracts.filter(contract =>
         contract.client.toLowerCase().includes(search.toLowerCase()) ||
         contract.value.toString().includes(search.toLowerCase()) ||
         contract.docUrl.toLowerCase().includes(search.toLowerCase()) ||
         contract.endDate.toString().includes(search.toLowerCase()) ||
         contract.startDate.toLowerCase().includes(search.toLowerCase()) ||
         contract.status.toLowerCase().includes(search.toLowerCase())
        );
    }


    const active = contracts.filter(contract => contract.status === "ACTIVE");
    const expiring = contracts.filter(contract => contract.status === "EXPIRING");
    const expired = contracts.filter(contract => contract.status === "EXPIRED");
    const cancelled = contracts.filter(contract => contract.status === "CANCELLED");

    if(status !== "") {
        contracts = contracts.filter(contract => contract.status === status);
    }
    const navigate = useNavigate();

    const openContract = (id: number) => {
        navigate(`/admin/contracts/${id}`);
    }
    //float value
    const valor = contracts.reduce((total, contract) => {
        return total + contract.value;
    }, 0);
    

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Contratos</h2>
            <div className="flex flex-col justify-center">
                <div className="flex flex-row">
                    <Button onClick={()=>{
                        setStatus("");
                    }}>Todos</Button>
                    <Button onClick={() => {
                        setStatus("ACTIVE");
                    }} variant="success">Ativos {active.length}</Button>
                    <Button onClick={() => {
                        setStatus("EXPIRING");
                    }} variant="warning">Vencendo {expiring.length}</Button>
                    <Button onClick={() => {
                        setStatus("EXPIRED");
                    }} variant="destructive">Vencidos {expired.length}</Button>
                    <Button onClick={() => {
                        setStatus("CANCELLED");
                    }} variant="secondary">Cancelados {cancelled.length}</Button>
                    <Button variant="ghost" className="ml-auto">Receita Total R$ {valor}</Button>
                </div>
                <Separator className="mt-2"></Separator>
                <div className="flex gap-4 my-4">
                    <div className="flex gap-4">
                        <Input onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar" className="w-60" type="text"></Input>
                        <Button type="submit" variant="default">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button className="ml-auto" onClick={() => navigate("/admin/contracts/create")}>Novo Contrato</Button>
                </div>

                <div className="border rounded-2xl">

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Cliente</TableHead>
                                <TableHead className="text-center">Doc Url</TableHead>
                                <TableHead className="text-center">Data de Início</TableHead>
                                <TableHead className="text-center">Data de Vencimento</TableHead>
                                <TableHead className="text-center">Valor</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { contracts.length > 0 && contracts.map((contract) => (
                                <TableRow key={contract.id}>
                                    <TableCell className="text-center">
                                        {contract.client}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <a
                                            href={contract.docUrl}
                                            target="_blank"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Documento
                                        </a>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {contract.startDate}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {contract.endDate}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        R$ {contract.value}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <Badge className={contract.status === "ACTIVE" ? "bg-green-500" : contract.status === "EXPIRING" ? "bg-yellow-500" : contract.status === "EXPIRED" ? "bg-red-500" : contract.status === "CANCELLED" ? "bg-gray-500" : ""}>{contract.status}</Badge>
                                    </TableCell>
                                    <TableCell className="flex justify-center gap-2">
                                        <Button size="icon" variant="outline" onClick={() => openContract(contract.id)}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="outline" onClick={() => navigate(`/admin/contracts/edit/${contract.id}`)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {contracts.length === 0 && <TableRow><TableCell className="text-center p-4" colSpan={7}>Nenhum contrato encontrado</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </div>

            </div>
        </div>
    )
}
