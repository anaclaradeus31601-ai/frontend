import { CreateForm } from "#components/shared/create-form";
import { useOwners, useRealtors } from "../../../hooks";
import { PropertyStatus, PropertyType, TransactionType } from "../../../types/database";
import { createPropertySchema, type CreatePropertyFormData } from "../../../validations/forms";

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

export default function CreateProperties() {
    const { data: owners } = useOwners();
    const { data: realtors } = useRealtors();

    const ownerOptions = (owners ?? []).map((owner) => ({
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
        <CreateForm
            schema={createPropertySchema}
            title="Criar Imóvel"
            description="Preencha os dados do imóvel com endereço, valores e características."
            backUrl="/admin/properties"
            submitUrl="/admin/properties"
            redirectUrl="/admin/properties"
            submitLabel="Salvar imóvel"
            transformPayload={(data: CreatePropertyFormData) => ({
                ownerId: data.ownerId,
                realtorId: data.realtorId || null,
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
                area: data.area,
                bedrooms: data.bedrooms,
                bathrooms: data.bathrooms,
                garages: data.garages,
                rentPrice: parseOptionalNumber(data.rentPrice),
                salePrice: parseOptionalNumber(data.salePrice),
                condominiumFee: parseOptionalNumber(data.condominiumFee),
                iptu: parseOptionalNumber(data.iptu),
                images: parseStringList(data.images),
                videos: parseStringList(data.videos),
                virtualTourUrl: data.tour || null,
                latitude: parseOptionalNumber(data.latitude),
                longitude: parseOptionalNumber(data.longitude),
                featured: data.featured === "true",
            })}
            fields={[
                { name: "title", label: "Título", type: "text", placeholder: "Casa moderna com piscina", required: true, span: "full" },
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
                    defaultValue: PropertyStatus.AVAILABLE,
                    options: [
                        { value: PropertyStatus.AVAILABLE, label: "Disponível" },
                        { value: PropertyStatus.RENTED, label: "Alugado" },
                        { value: PropertyStatus.SOLD, label: "Vendido" },
                        { value: PropertyStatus.PENDING, label: "Pendente" },
                        { value: PropertyStatus.MAINTENANCE, label: "Manutenção" },
                    ],
                    span: "full",
                },
                { name: "rentPrice", label: "Valor do aluguel", type: "text", placeholder: "R$ 2.500,00" },
                { name: "salePrice", label: "Valor da venda", type: "text", placeholder: "R$ 750.000,00" },
                { name: "description", label: "Descrição", type: "textarea", placeholder: "Destaques do imóvel, diferenciais e acabamento.", required: true, span: "full" },
                { name: "bedrooms", label: "Quartos", type: "number", placeholder: "3", required: true },
                { name: "bathrooms", label: "Banheiros", type: "number", placeholder: "2", required: true },
                { name: "garages", label: "Garagens", type: "number", placeholder: "2", required: true },
                { name: "area", label: "Área (m²)", type: "number", placeholder: "150", required: true },
                { name: "street", label: "Rua", type: "text", placeholder: "Av. Beira Mar", required: true, span: "full" },
                { name: "number", label: "Número", type: "text", placeholder: "2500", required: true },
                { name: "complement", label: "Complemento", type: "text", placeholder: "Apto 302" },
                { name: "neighborhood", label: "Bairro", type: "text", placeholder: "Jurerê", required: true },
                { name: "city", label: "Cidade", type: "text", placeholder: "Florianópolis", required: true },
                { name: "state", label: "Estado", type: "text", placeholder: "SC", required: true },
                { name: "zipCode", label: "CEP", type: "text", placeholder: "00000-000", required: true },
                { name: "country", label: "País", type: "text", placeholder: "Brasil", required: true, defaultValue: "Brasil" },
                { name: "condominiumFee", label: "Condomínio", type: "text", placeholder: "R$ 800,00" },
                { name: "iptu", label: "IPTU", type: "text", placeholder: "R$ 1.200,00" },
                { name: "latitude", label: "Latitude", type: "text", placeholder: "-27.5794" },
                { name: "longitude", label: "Longitude", type: "text", placeholder: "-48.5499" },
                {
                    name: "featured",
                    label: "Destaque",
                    type: "select",
                    defaultValue: "false",
                    options: [
                        { value: "true", label: "Sim" },
                        { value: "false", label: "Não" },
                    ],
                    span: "full",
                },
                {
                    name: "ownerId",
                    label: "Proprietário",
                    type: "relation",
                    required: true,
                    relationOptions: ownerOptions,
                    relationSearchPlaceholder: "Buscar proprietário por nome, e-mail ou ID",
                },
                {
                    name: "realtorId",
                    label: "Corretor",
                    type: "relation",
                    relationOptions: realtorOptions,
                    relationSearchPlaceholder: "Buscar corretor por nome, e-mail ou ID",
                },
                { name: "images", label: "Imagens", type: "textarea", placeholder: "URLs separadas por vírgula", rows: 3, span: "full" },
                { name: "videos", label: "Vídeos", type: "textarea", placeholder: "URLs separadas por vírgula", rows: 3, span: "full" },
                { name: "tour", label: "Tour virtual", type: "url", placeholder: "https://..." , span: "full" },
            ]}
        />
    );
}
