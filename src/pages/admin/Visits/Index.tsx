import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "#components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IndexVisits(){

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    let visits = [
        {
            id: 1,
            property: "Apartamento 101",
            client: "João Silva",
            date: "01/07/2024",
            time: "14:00",
            realtor: "Carlos Pereira",
        },
        {
            id: 2,
            property: "Casa 202",
            client: "Maria Oliveira",
            date: "02/07/2024",
            time: "10:00",
            realtor: "Ana Costa",
        },
        {
            id: 3,
            property: "Apartamento 303",
            client: "Pedro Santos",
            date: "03/07/2024",
            time: "16:00",
            realtor: "Ricardo Almeida",
        },
    ];
    

    if (search) {
        visits = visits.filter(visit =>
            visit.client.toLowerCase().includes(search.toLowerCase()) ||
            visit.property.toLowerCase().includes(search.toLowerCase()) ||
            visit.realtor.toLowerCase().includes(search.toLowerCase()) ||
            visit.date.includes(search) ||
            visit.time.includes(search)
        );
    }

 


    return (
        <div className="p-6 max-w-full mx-auto space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Visitas</h2>
            <div className="flex items-center gap-4">
                <Input
                    type="text"
                    placeholder="Buscar por cliente, imóvel ou corretor"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-60"
                />
                <Button>
                    Buscar
                </Button>
                <Button className="ml-auto" onClick={() => navigate("/admin/visits/create")}>
                    Criar Visita
                </Button>
            </div>
            <div className="overflow-x-auto border rounded-2xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Imóvel</TableHead>
                            <TableHead className="text-center">Cliente</TableHead>
                            <TableHead className="text-center">Data</TableHead>
                            <TableHead className="text-center">Hora</TableHead>
                            <TableHead className="text-center">Corretor</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {visits.map((visit) => (
                            <TableRow key={visit.id} className="border-t">
                                <TableCell className="text-center">{visit.property}</TableCell>
                                <TableCell className="text-center">{visit.client}</TableCell>
                                <TableCell className="text-center">{visit.date}</TableCell>
                                <TableCell className="text-center">{visit.time}</TableCell>
                                <TableCell className="text-center">{visit.realtor}</TableCell>
                                <TableCell className="text-center">
                                    <Button variant="outline" size="sm" className="mr-2" onClick={() => navigate(`/admin/visits/${visit.id}`)}>
                                        <Eye></Eye>
                                    </Button>
                                    <Button variant="outline" size="sm" className="mr-2" onClick={() => navigate(`/admin/visits/edit/${visit.id}`)}>
                                        <Pencil></Pencil>
                                    </Button>
                                    <Button variant="destructive" size="sm">
                                        <Trash2></Trash2>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {visits.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center p-4">
                                    Nenhuma visita encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
