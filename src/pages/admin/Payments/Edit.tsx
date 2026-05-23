import { EditForm } from "#components/shared/edit-form";
import { useParams } from "react-router-dom";
import { editPaymentSchema } from "../../../validations/forms";

export default function EditPayments() {
  const { id } = useParams();

  return (
    <EditForm
      schema={editPaymentSchema}
      title="Editar Pagamento"
      description={`Atualize os dados do pagamento ${id ? `#${id}` : ""}.`}
      backUrl="/admin/payments"
      submitUrl={id ? `/admin/payments/${id}` : "/admin/payments"}
      redirectUrl="/admin/payments"
      submitLabel="Salvar alterações"
      initialValues={{
        client: "John Doe",
        contract: "Contrato #001",
        amount: "R$ 2.500,00",
        paymentMethod: "pix",
        dueDate: "2026-05-30",
        paidDate: "2026-05-25",
        status: "completed",
        reference: "Maio/2026",
        notes: "Pagamento recebido com comprovante enviado pelo cliente.",
      }}
      fields={[
        { name: "client", label: "Cliente", type: "text", required: true },
        { name: "contract", label: "Contrato", type: "text", required: true },
        { name: "amount", label: "Valor", type: "text", required: true },
        {
          name: "paymentMethod",
          label: "Método",
          type: "select",
          required: true,
          options: [
            { value: "pix", label: "Pix" },
            { value: "credit-card", label: "Cartão" },
            { value: "bank-slip", label: "Boleto" },
            { value: "transfer", label: "Transferência" },
          ],
        },
        { name: "dueDate", label: "Data de vencimento", type: "date", required: true },
        { name: "paidDate", label: "Data de pagamento", type: "date" },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { value: "pending", label: "Pendente" },
            { value: "active", label: "Ativo" },
            { value: "completed", label: "Concluído" },
            { value: "refunded", label: "Reembolsado" },
          ],
        },
        { name: "reference", label: "Referência", type: "text" },
        { name: "notes", label: "Observações", type: "textarea", span: "full" },
      ]}
    />
  );
}
