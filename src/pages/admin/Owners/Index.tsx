import { Trash2, Pencil, Eye } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { Button } from "#components/ui/button";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
export default function IndexOwners() {

    return (

        <div className="p-6 max-w-full mx-auto">
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
                        {Array.from({ length: 10 }).map((_, index) => (
                            <TableRow>
                                <TableCell className="font-medium text-center">sddshvbsdsmdclkn</TableCell>
                                <TableCell className="font-medium text-center">John Doe {index + 1}</TableCell>
                                <TableCell className="font-medium text-center">(16) 99999-9999</TableCell>
                                <TableCell className="font-medium text-center">johndoe{index + 1}@gmail.com</TableCell>
                                <TableCell className="font-medium text-center">123.456.{index}89-00</TableCell>
                                <TableCell className="flex justify-center gap-2">
                                    <Button size="icon" variant="outline">
                                        <Eye className="h-4 w-4" />
                                    </Button>

                                    <Button size="icon" variant="outline">
                                        <Pencil className="h-4 w-4" />
                                    </Button>

                                    <Button size="icon" variant="destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>
        </div>

    );
}