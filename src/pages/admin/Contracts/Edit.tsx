import { EditForm } from "#components/shared/edit-form";
import { useClients } from "#hooks/use-users";
import { useMemo } from "react";
import { useProperties } from "../../../hooks/use-properties";
import { useContractById } from "../../../hooks/use-public-properties";
import { ContractStatus, TransactionType } from "../../../types/database";
import { createContractSchema, type CreateContractFormData } from "../../../validations/forms";
import { useParams } from "react-router-dom";

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

export default function EditContracts() {
  const { id } = useParams();
  const { data: contract, isLoading: loadingContract } = useContractById(id);
  const { data: properties, loading: loadingProperties } = useProperties();
  const { data: clients, isLoading: loadingClients } = useClients();

  const propertyOptions = useMemo(
    () =>
      properties.map((property) => ({
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

  if (loadingContract) {
    return <div className="p-6">Carregando contrato...</div>;
  }

  if (!contract) {
    return <div className="p-6">Contrato não encontrado.</div>;
  }

  return (
    <EditForm
      key={contract.id}
      schema={createContractSchema}
      title="Editar Contrato"
      description={`Atualize as informações do contrato ${id ? `#${id}` : ""}.`}
      backUrl="/admin/contracts"
      submitUrl={id ? `/admin/contract/${id}` : "/admin/contract"}
      redirectUrl="/admin/contracts"
      submitLabel="Salvar alterações"
      initialValues={{
        propertyId: contract.propertyId,
        clientId: contract.clientId,
        transactionType: contract.transactionType,
        status: contract.status,
        startDate: contract.startDate,
        endDate: contract.endDate ?? "",
        rentValue: contract.rentValue?.toString() ?? "",
        saleValue: contract.saleValue?.toString() ?? "",
        documentUrl: contract.documentUrl ?? "",
        notes: contract.terms,
      }}
      fields={[
        {
          name: "propertyId",
          label: "Imóvel",
          type: "relation",
          required: true,
          relationOptions: propertyOptions,
          relationLoading: loadingProperties,
        },
        {
          name: "clientId",
          label: "Cliente",
          type: "relation",
          required: true,
          relationOptions: clientOptions,
          relationLoading: loadingClients,
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
        { name: "documentUrl", label: "URL do documento", type: "url", placeholder: "https://...", span: "full" },
        { name: "notes", label: "Cláusulas e observações", type: "textarea", required: true, rows: 5, span: "full" },
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
