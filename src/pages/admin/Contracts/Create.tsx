import { CreateForm } from "#components/shared/create-form";
import { useClients } from "#hooks/use-users";
import { useMemo } from "react";
import { useProperties } from "../../../hooks/use-properties";
import { ContractStatus, TransactionType } from "../../../types/database";
import { createContractSchema, type CreateContractFormData } from "../../../validations/forms";

function parseOptionalCurrency(value?: string) {
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

export default function CreateContracts() {
  const { data: properties, loading: loadingProperties } = useProperties();
  const { data: clients, isLoading: loadingClients } = useClients();

  const propertyOptions = useMemo(
    () =>
      (properties ?? []).map((property) => ({
        id: property.id,
        label: property.title,
        description: `${property.city} - ${property.neighborhood}`,
      })),
    [properties],
  );

  const clientOptions = useMemo(
    () =>
      (clients ?? []).map((client) => ({
        id: client.id,
        label: client.name,
        description: client.email,
      })),
    [clients],
  );

  return (
    <CreateForm
      schema={createContractSchema}
      title="Criar Contrato"
      description="Monte um novo contrato com cliente, imóvel, período e valor acordado."
      backUrl="/admin/contracts"
      submitUrl="/admin/contract"
      redirectUrl="/admin/contracts"
      submitLabel="Salvar contrato"
      fields={[
        {
          name: "propertyId",
          label: "Imóvel",
          type: "relation",
          required: true,
          relationOptions: propertyOptions,
          relationLoading: loadingProperties,
          relationSearchPlaceholder: "Buscar imóvel por título, cidade ou ID",
        },
        {
          name: "clientId",
          label: "Cliente",
          type: "relation",
          required: true,
          relationOptions: clientOptions,
          relationLoading: loadingClients,
          relationSearchPlaceholder: "Buscar cliente por nome, e-mail ou ID",
        },
        {
          name: "transactionType",
          label: "Tipo de transação",
          type: "select",
          required: true,
          options: [
            { value: TransactionType.RENT, label: "Aluguel" },
            { value: TransactionType.SALE, label: "Venda" },
          ],
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          defaultValue: ContractStatus.DRAFT,
          options: [
            { value: ContractStatus.DRAFT, label: "Rascunho" },
            { value: ContractStatus.ACTIVE, label: "Ativo" },
            { value: ContractStatus.EXPIRED, label: "Expirado" },
            { value: ContractStatus.TERMINATED, label: "Encerrado" },
            { value: ContractStatus.CANCELLED, label: "Cancelado" },
          ],
        },
        { name: "startDate", label: "Data de início", type: "date", required: true },
        { name: "endDate", label: "Data de vencimento", type: "date" },
        { name: "rentValue", label: "Valor do aluguel", type: "text", placeholder: "R$ 2.500,00" },
        { name: "saleValue", label: "Valor da venda", type: "text", placeholder: "R$ 750.000,00" },
        {
          name: "documentUrl",
          label: "URL do documento",
          type: "url",
          placeholder: "https://...",
          span: "full",
        },
        {
          name: "notes",
          label: "Cláusulas e observações",
          type: "textarea",
          required: true,
          rows: 5,
          span: "full",
          placeholder: "Anotações internas, garantias ou detalhes importantes da negociação.",
        },
      ]}
      transformPayload={(data: CreateContractFormData) => ({
        propertyId: data.propertyId,
        clientId: data.clientId,
        transactionType: data.transactionType,
        status: data.status,
        startDate: data.startDate,
        endDate: data.endDate || null,
        rentValue: parseOptionalCurrency(data.rentValue),
        saleValue: parseOptionalCurrency(data.saleValue),
        terms: data.notes,
        documentUrl: data.documentUrl || null,
      })}
    />
  );
}
