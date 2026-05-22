import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Separator } from "#components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function IndexPayments() {

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();
    let payments = [
        {
            id: 1,
            nameClient: "John Doe",
            amount: 2500,
            dueDate: "10/01/2025",
            paidDate: "13/01/2025",
            status: "ACTIVE",
        },
        {
            id: 2,
            nameClient: "Pagamento 2",
            amount: 2500,
            dueDate: "10/01/2025",
            paidDate: "13/01/2025",
            status: "REFUNDED",
        },
        {
            id: 3,
            nameClient: "Pagamento 3",
            amount: 2500,
            dueDate: "10/01/2025",
            paidDate: "13/01/2025",
            status: "COMPLETED",
        },
        {
            id: 4,
            nameClient: "Pagamento 4",
            amount: 2500,
            dueDate: "10/01/2025",
            paidDate: "13/01/2025",
            status: "PENDING",
        }
    ]

    if (search !== "") {
        payments = payments.filter(payment =>
            payment.nameClient.toLowerCase().includes(search.toLowerCase()) ||
            payment.status.toLowerCase().includes(search.toLowerCase()) ||
            payment.dueDate.toLowerCase().includes(search.toLowerCase()) ||
            payment.paidDate.toLowerCase().includes(search.toLowerCase()) ||
            payment.amount.toString().includes(search.toLowerCase())
        );
    }

    if (status !== "") {
        payments = payments.filter(payment => payment.status === status);
    }


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold tracking-tight">Pagamentos</h2>

            <div className="mt-6">
                <div className="flex">
                    <Button onClick={() => {
                        setStatus("");
                    }}>Todos: {payments.length}</Button>
                    <Button variant="success" onClick={() => {
                        setStatus("COMPLETED");
                    }}>Concluidos: {payments.filter(payment => payment.status === "COMPLETED").length}</Button>
                    <Button className="bg-blue-500/50 hover:bg-blue-500/50 text-h" onClick={() => {
                        setStatus("ACTIVE");
                    }}>Ativos: {payments.filter(payment => payment.status === "ACTIVE").length}</Button>
                    <Button variant="destructive" onClick={() => {
                        setStatus("REFUNDED");
                    }}>Reembolsados: {payments.filter(payment => payment.status === "REFUNDED").length}</Button>
                    <Button variant="warning" onClick={() => {
                        setStatus("PENDING");
                    }}>Pendentes: {payments.filter(payment => payment.status === "PENDING").length}</Button>
                </div>
                <Separator className="mt-2"></Separator>
                <div className="flex gap-4 mt-4 mb-4">
                    <Input className="w-60" placeholder="Buscar" onChange={(e) => setSearch(e.target.value)}></Input>
                    <Button className="ml-auto">Total R$: {payments.reduce((total, payment) => total + payment.amount, 0)}</Button>
                </div>
                <div className="border rounded-2xl">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Nome do Cliente</TableHead>
                                <TableHead className="text-center">Valor</TableHead>
                                <TableHead className="text-center">Data de Vencimento</TableHead>
                                <TableHead className="text-center">Data de Pagamento</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map(payment => (
                                <TableRow key={payment.id} onClick={() => navigate(`/admin/payments/${payment.id}`)}>
                                    <TableCell className="text-center">{payment.nameClient}</TableCell>
                                    <TableCell className="text-center">{payment.amount}</TableCell>
                                    <TableCell className="text-center">{payment.dueDate}</TableCell>
                                    <TableCell className="text-center">{payment.paidDate}</TableCell>
                                    <TableCell className="text-center"><Badge className={` text-h ${payment.status === "COMPLETED" ? "bg-green-500/50" : payment.status === "REFUNDED" ? "bg-red-500/50" : payment.status === "PENDING" ? "bg-yellow-500/50" : "bg-blue-500/50"}`}>{payment.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                            {payments.length === 0 && <TableRow><TableCell className="text-center py-4" colSpan={5}>Nenhum pagamento encontrado.</TableCell></TableRow>}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}