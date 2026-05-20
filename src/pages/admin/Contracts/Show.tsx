
import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card"
import { ChevronLeft } from "lucide-react";
import { useParams } from "react-router-dom"
export default function ShowContracts() {


    const contracts =[
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

    const { id } = useParams<{ id: string }>();
    let contract = contracts.find(c => c.id == Number(id));

    return (
        <div className="p-6">
            <div className="space-y-6">
                <Button onClick={() => window.history.back()} variant={"ghost"}><ChevronLeft></ChevronLeft></Button>                
                <Card>
                    <CardHeader className="flex" >
                        <CardTitle>Detalhes do contrato: {contract?.client}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Documento: <a href={contract?.docUrl} target="_blank">Clique aqui</a></p>
                        <p>Início: {contract?.startDate}</p>
                        <p>Fim: {contract?.endDate}</p>
                        <p>Valor: {contract?.value}</p>
                        <p>Status: {contract?.status}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}