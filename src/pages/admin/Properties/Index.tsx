import { Button } from "#components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "#components/ui/dialog";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { importProperties } from "../../../scripts/importProperties";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function IndexProperties() {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");

    const [imoveis, setImoveis] = useState([
        {
            id: 1,
            title: 'Casa moderna com piscina',
            rentPrice: 1500.00,
            salePrice: 2000.00,
            bathrooms: 2,
            bedrooms: 3,
            garages: 2,
            area: 150,
            images: [
                'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
            ],


        },
        {
            id: 2,
            title: 'Casa moderna com piscina',
            rentPrice: 1500.00,
            salePrice: 2000.00,
            bathrooms: 2,
            bedrooms: 3,
            garages: 1,
            area: 150,
            images: [
                'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
            ]
        },
        {
            id: 3,
            title: 'Casa moderna com piscina',
            rentPrice: 1500.00,
            salePrice: 20000.00,
            bathrooms: 1,
            bedrooms: 2,
            garages: 3,
            area: 150,
            images: [
                'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
            ]
        },
        {
            id: 4,
            title: 'Casa moderna com piscina',
            rentPrice: 1500.00,
            salePrice: 2000.00,
            description: 'Casa moderna com piscina',
            transactionType: 'RENT',
            type: 'RESIDENTIAL',
            status: 'AVAILABLE',
            bathrooms: 2,
            bedrooms: 3,
            garages: 1,
            area: 150,
            images: [
                'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
            ],
            street: 'Av. Governador Irineu Bornhausen',
            number: '2500',
            complement: 'Casa 02',
            neighborhood: 'Jurerê Internacional',
            city: 'Florianópolis',
            state: 'SC',
            zipCode: '88053-300',
            country: 'Brasil',
            virtualTourUrl: 'https://my.matterport.com/show/?m=example4',
            iptu: 1200.0,
            condominiumFee: 1800.0,
            videos: [
                'https://www.youtube.com/watch?v=example1',
                'https://www.youtube.com/watch?v=example2'
            ],
            latitude: -27.5794,
            longitude: -48.5499,
            featured: true,
            ownerId: 1,
            realtorId: 1,

        }
    ]);

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);
    };

    const handleImport = async () => {

        if (!file) return;

        try {

            const data = await importProperties(file);
            // fecha dialog
            setOpen(false);

            setFile(null);

            setImoveis((prev) => [
                ...prev,
                ...data
            ]);

        } catch (error) {

            console.log(error);

        }
    };

    const filteredImoveis = searchTerm
        ? imoveis.filter((imovel) =>
            imovel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            imovel.garages?.toString().includes(searchTerm.toLowerCase()) ||
            imovel.bedrooms.toString().includes(searchTerm.toLowerCase())
        )
        : imoveis;




    return (
        <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Imóveis</h2>
            <div className="w-full mb-4 flex justify-end gap-3">
                <Input className="w-60 mr-auto" placeholder="Pesquisar" onChange={(e) => setSearchTerm(e.target.value)} />
                <Button onClick={() => navigate("/admin/properties/create")}>Criar Imóvel</Button>
                <Dialog  open={open} onOpenChange={setOpen}>

                    <DialogTrigger asChild>
                        <Button>
                            Importar planilha de imóveis
                        </Button>
                    </DialogTrigger>

                    <DialogContent>

                        <DialogHeader>
                            <DialogTitle>
                                Importar planilha
                            </DialogTitle>

                            <DialogDescription>
                                Selecione uma planilha Excel
                            </DialogDescription>
                        </DialogHeader>

                        <Input
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={handleFileChange}
                        />

                        <DialogFooter>

                            <DialogClose asChild>
                                <Button variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>

                            <DialogTrigger>
                                <Button onClick={handleImport}>Importar</Button>
                            </DialogTrigger>


                        </DialogFooter>

                    </DialogContent>

                </Dialog>
            </div>
            <div className="border rounded-2xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Imóvel</TableHead>
                            <TableHead className="text-center">Valor aluguel</TableHead>
                            <TableHead className="text-center">Valor venda</TableHead>
                            <TableHead className="text-center">Banheiros</TableHead>
                            <TableHead className="text-center">Quartos</TableHead>
                            <TableHead className="text-center">Garagem</TableHead>
                            <TableHead className="text-center">Area</TableHead>
                            <TableHead className="text-center">Imagens</TableHead>
                            <TableHead className="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredImoveis.map((imovel) => (
                            <TableRow key={imovel.id}>
                                <TableCell className="text-center">{imovel.title}</TableCell>
                                <TableCell className="text-center">{imovel.rentPrice}</TableCell>
                                <TableCell className="text-center">{imovel.salePrice}</TableCell>
                                <TableCell className="text-center">{imovel.bathrooms}</TableCell>
                                <TableCell className="text-center">{imovel.bedrooms}</TableCell>
                                <TableCell className="text-center">{imovel.garages ? 'Sim' : 'Nao'}</TableCell>
                                <TableCell className="text-center">{imovel.area}</TableCell>
                                <TableCell className="text-center">{imovel.images.length}</TableCell>
                                <TableCell className="items-center justify-center flex gap-2">
                                    <Button variant="outline" onClick={() => navigate(`/admin/properties/${imovel.id}`)}><Eye></Eye></Button>
                                    <Button variant="outline" onClick={() => navigate(`/admin/properties/edit/${imovel.id}`)}><Pencil></Pencil></Button>
                                    <Button variant="destructive"><Trash2></Trash2></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
