import { EditForm } from "#components/shared/edit-form";
import { useOwners, useRealtors } from "../../../hooks";
import { usePropertyById } from "../../../hooks/use-public-properties";
import { PropertyStatus, PropertyType, TransactionType } from "../../../types/database";
import { editPropertySchema } from "../../../validations/forms";
import { useParams } from "react-router-dom";

function parseOptionalNumber(value?: string) {
  if (!value?.trim()) {
    return null;
  }

  const normalizedValue = value
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  const numericValue = Number(normalizedValue);
  return Number.isNaN(numericValue) ? null : numericValue;
}

function parseStringList(value?: string) {
  if (!value?.trim()) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function EditProperties() {
  const { id } = useParams();
  const { data: property, isLoading } = usePropertyById(id);
  const { data: owners } = useOwners();
  const { data: realtors } = useRealtors();

  if (isLoading) {
    return <div className="p-6">Carregando imóvel...</div>;
  }

  if (!property) {
    return <div className="p-6">Imóvel não encontrado.</div>;
  }

  const ownerOptions = owners.map((owner) => ({
    id: owner.id,
    label: owner.name,
    description: owner.email,
  }));

  const realtorOptions = (realtors ?? []).map((realtor) => ({
    id: realtor.id,
    label: realtor.name,
    description: realtor.email,
  }));

  return (
    <EditForm
      key={property.id}
      schema={editPropertySchema}
      title="Editar Imóvel"
      description={`Atualize os dados do imóvel ${id ? `#${id}` : ""}.`}
      backUrl="/admin/properties"
      submitUrl={id ? `/admin/property/${id}` : "/admin/property"}
      redirectUrl="/admin/properties"
      submitLabel="Salvar alterações"
      initialValues={{
        title: property.title,
        transactionType: property.transactionType,
        category: property.type,
        status: property.status,
        rentPrice: property.rentPrice?.toString() ?? "",
        salePrice: property.salePrice?.toString() ?? "",
        description: property.description,
        bedrooms: property.bedrooms.toString(),
        bathrooms: property.bathrooms.toString(),
        garages: (property.garages ?? 0).toString(),
        area: property.area.toString(),
        street: property.street,
        number: property.number,
        complement: property.complement ?? "",
        neighborhood: property.neighborhood,
        city: property.city,
        state: property.state,
        zipCode: property.zipCode,
        country: property.country,
        condominiumFee: property.condominiumFee?.toString() ?? "",
        iptu: property.iptu?.toString() ?? "",
        latitude: property.latitude?.toString() ?? "",
        longitude: property.longitude?.toString() ?? "",
        featured: String(property.featured),
        owner: property.ownerId,
        realtor: property.realtorId ?? "",
        tour: property.virtualTourUrl ?? "",
        video: property.videos.join(", "),
        images: property.images.join(", "),
      } as never}
      fields={[
        { name: "title", label: "Título", type: "text", required: true, span: "full" },
        {
          name: "transactionType",
          label: "Tipo de negociação",
          type: "select",
          required: true,
          options: [
            { value: TransactionType.RENT, label: "Aluguel" },
            { value: TransactionType.SALE, label: "Venda" },
          ],
        },
        {
          name: "category",
          label: "Categoria",
          type: "select",
          required: true,
          options: [
            { value: PropertyType.RESIDENTIAL, label: "Residencial" },
            { value: PropertyType.COMMERCIAL, label: "Comercial" },
          ],
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { value: PropertyStatus.AVAILABLE, label: "Disponível" },
            { value: PropertyStatus.RENTED, label: "Alugado" },
            { value: PropertyStatus.SOLD, label: "Vendido" },
            { value: PropertyStatus.PENDING, label: "Pendente" },
            { value: PropertyStatus.MAINTENANCE, label: "Manutenção" },
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
        {
          name: "owner",
          label: "Proprietário",
          type: "relation",
          relationOptions: ownerOptions,
          required: true,
        },
        {
          name: "realtor",
          label: "Corretor",
          type: "relation",
          relationOptions: realtorOptions,
        },
        { name: "tour", label: "Tour virtual", type: "url" },
        { name: "video", label: "Vídeos", type: "textarea", span: "full" },
        { name: "images", label: "Imagens", type: "textarea", span: "full", rows: 3 },
      ]}
      transformPayload={(data: any) => ({
        ownerId: data.owner || property.ownerId,
        realtorId: data.realtor || null,
        title: data.title,
        description: data.description,
        type: data.category,
        transactionType: data.transactionType,
        status: data.status,
        street: data.street,
        number: data.number,
        complement: data.complement || null,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        area: Number(data.area),
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        garages: Number(data.garages),
        rentPrice: parseOptionalNumber(data.rentPrice),
        salePrice: parseOptionalNumber(data.salePrice),
        condominiumFee: parseOptionalNumber(data.condominiumFee),
        iptu: parseOptionalNumber(data.iptu),
        images: parseStringList(data.images),
        videos: parseStringList(data.video),
        virtualTourUrl: data.tour || null,
        latitude: parseOptionalNumber(data.latitude),
        longitude: parseOptionalNumber(data.longitude),
        featured: data.featured === "true",
      })}
    />
  );
}
