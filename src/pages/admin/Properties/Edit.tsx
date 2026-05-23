import { EditForm } from "#components/shared/edit-form";
import { useParams } from "react-router-dom";
import { editPropertySchema } from "../../../validations/forms";

export default function EditProperties() {
  const { id } = useParams();

  return (
    <EditForm
      schema={editPropertySchema}
      title="Editar Imóvel"
      description={`Atualize os dados do imóvel ${id ? `#${id}` : ""}.`}
      backUrl="/admin/properties"
      submitUrl={id ? `/admin/properties/${id}` : "/admin/properties"}
      redirectUrl="/admin/properties"
      submitLabel="Salvar alterações"
      initialValues={{
        title: "Casa moderna com piscina",
        transactionType: "rent",
        category: "residential",
        status: "available",
        rentPrice: "R$ 2.500,00",
        salePrice: "R$ 750.000,00",
        description: "Imóvel com excelente iluminação natural, área gourmet e localização privilegiada.",
        bedrooms: "3",
        bathrooms: "2",
        garages: "2",
        area: "150",
        street: "Av. Beira Mar",
        number: "2500",
        complement: "Apto 302",
        neighborhood: "Jurerê",
        city: "Florianópolis",
        state: "SC",
        zipCode: "00000-000",
        country: "Brasil",
        condominiumFee: "R$ 800,00",
        iptu: "R$ 1.200,00",
        latitude: "-27.5794",
        longitude: "-48.5499",
        featured: "true",
        owner: "1",
        realtor: "1",
        tour: "https://example.com/tour",
        video: "https://youtube.com/watch?v=123",
        images: "https://image1.jpg, https://image2.jpg",
      }}
      fields={[
        { name: "title", label: "Título", type: "text", required: true, span: "full" },
        {
          name: "transactionType",
          label: "Tipo de negociação",
          type: "select",
          required: true,
          options: [
            { value: "rent", label: "Aluguel" },
            { value: "sale", label: "Venda" },
            { value: "both", label: "Ambos" },
          ],
        },
        {
          name: "category",
          label: "Categoria",
          type: "select",
          required: true,
          options: [
            { value: "residential", label: "Residencial" },
            { value: "commercial", label: "Comercial" },
            { value: "land", label: "Terreno" },
          ],
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { value: "available", label: "Disponível" },
            { value: "rented", label: "Alugado" },
            { value: "sold", label: "Vendido" },
            { value: "pending", label: "Pendente" },
            { value: "maintenance", label: "Manutenção" },
          ],
        },
        { name: "rentPrice", label: "Valor do aluguel", type: "text" },
        { name: "salePrice", label: "Valor da venda", type: "text" },
        { name: "description", label: "Descrição", type: "textarea", required: true, span: "full" },
        { name: "bedrooms", label: "Quartos", type: "number", required: true },
        { name: "bathrooms", label: "Banheiros", type: "number", required: true },
        { name: "garages", label: "Garagens", type: "number", required: true },
        { name: "area", label: "Área (m²)", type: "number", required: true },
        { name: "street", label: "Rua", type: "text", required: true, span: "full" },
        { name: "number", label: "Número", type: "text", required: true },
        { name: "complement", label: "Complemento", type: "text" },
        { name: "neighborhood", label: "Bairro", type: "text", required: true },
        { name: "city", label: "Cidade", type: "text", required: true },
        { name: "state", label: "Estado", type: "text", required: true },
        { name: "zipCode", label: "CEP", type: "text", required: true },
        { name: "country", label: "País", type: "text", required: true },
        { name: "condominiumFee", label: "Condomínio", type: "text" },
        { name: "iptu", label: "IPTU", type: "text" },
        { name: "latitude", label: "Latitude", type: "text" },
        { name: "longitude", label: "Longitude", type: "text" },
        {
          name: "featured",
          label: "Destaque",
          type: "select",
          options: [
            { value: "true", label: "Sim" },
            { value: "false", label: "Não" },
          ],
        },
        { name: "owner", label: "ID do proprietário", type: "text" },
        { name: "realtor", label: "ID do corretor", type: "text" },
        { name: "tour", label: "Tour virtual", type: "url" },
        { name: "video", label: "Vídeo", type: "url" },
        { name: "images", label: "Imagens", type: "textarea", span: "full", rows: 3 },
      ]}
    />
  );
}
