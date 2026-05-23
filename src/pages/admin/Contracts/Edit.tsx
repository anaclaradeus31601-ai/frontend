import { EditForm } from "#components/shared/edit-form";
import { useParams } from "react-router-dom";
import { editContractSchema } from "../../../validations/forms";

export default function EditContracts() {
  const { id } = useParams();

  return (
    <EditForm
      schema={editContractSchema}
      title="Editar Contrato"
      description={`Atualize as informações do contrato ${id ? `#${id}` : ""}.`}
      backUrl="/admin/contracts"
      submitUrl={id ? `/admin/contracts/${id}` : "/admin/contracts"}
      redirectUrl="/admin/contracts"
      submitLabel="Salvar alterações"
      initialValues={{
        client: "John Doe",
        property: "Casa moderna com piscina",
        realtor: "Ana Clara",
        status: "active",
        startDate: "2026-01-10",
        endDate: "2027-01-10",
        value: "R$ 2.500,00",
        documentUrl: "https://example.com/contrato.pdf",
        notes: "Contrato com reajuste anual pelo índice acordado entre as partes.",
      }}
      fields={[
        { name: "client", label: "Cliente", type: "text", required: true },
        { name: "property", label: "Imóvel", type: "text", required: true },
        { name: "realtor", label: "Corretor", type: "text" },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { value: "active", label: "Ativo" },
            { value: "expiring", label: "Vencendo" },
            { value: "expired", label: "Vencido" },
            { value: "cancelled", label: "Cancelado" },
          ],
        },
        { name: "startDate", label: "Data de início", type: "date", required: true },
        { name: "endDate", label: "Data de vencimento", type: "date" },
        { name: "value", label: "Valor", type: "text" },
        { name: "documentUrl", label: "URL do documento", type: "url" },
        { name: "notes", label: "Cláusulas e observações", type: "textarea", required: true, span: "full" },
      ]}
    />
  );
}
