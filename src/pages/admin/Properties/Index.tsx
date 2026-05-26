import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "#components/ui/table";
import { useProperties } from "#hooks/use-properties";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
function formatCurrency(value?: number | null) {
  if (value == null) {
    return "-";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function IndexProperties() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: properties, loading, remove } = useProperties();


  const filteredProperties = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      return properties || [];
    }

    return (properties || []).filter((property) =>
      [property.title, property.city, property.neighborhood, property.status]
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [properties, searchTerm]);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Imóveis</h2>
      <div className="w-full mb-4 flex justify-end gap-3">
        <Input className="w-60 mr-auto" placeholder="Pesquisar" onChange={(event) => setSearchTerm(event.target.value)} />
        <Button onClick={() => navigate("/admin/properties/create")}>Criar Imóvel</Button>
      </div>
      <div className="border rounded-2xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Imóvel</TableHead>
              <TableHead className="text-center">Cidade</TableHead>
              <TableHead className="text-center">Valor aluguel</TableHead>
              <TableHead className="text-center">Valor venda</TableHead>
              <TableHead className="text-center">Quartos</TableHead>
              <TableHead className="text-center">Banheiros</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center p-4">Carregando imóveis...</TableCell>
              </TableRow>
            ) : filteredProperties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center p-4">Nenhum imóvel encontrado.</TableCell>
              </TableRow>
            ) : (
              filteredProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="text-center">{property.title}</TableCell>
                  <TableCell className="text-center">{property.city}</TableCell>
                  <TableCell className="text-center">{formatCurrency(property.rentPrice)}</TableCell>
                  <TableCell className="text-center">{formatCurrency(property.salePrice)}</TableCell>
                  <TableCell className="text-center">{property.bedrooms}</TableCell>
                  <TableCell className="text-center">{property.bathrooms}</TableCell>
                  <TableCell className="text-center">{property.status}</TableCell>
                  <TableCell className="items-center justify-center flex gap-2">
                    <Button variant="outline" onClick={() => navigate(`/admin/properties/${property.id}`)}><Eye /></Button>
                    <Button variant="outline" onClick={() => navigate(`/admin/properties/edit/${property.id}`)}><Pencil /></Button>
                    <Button variant="destructive" onClick={() => void remove(property.id)}><Trash2 /></Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
