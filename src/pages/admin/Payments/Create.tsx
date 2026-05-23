import { CreateForm } from "#components/shared/create-form";
import { useEffect, useMemo, useState } from "react";
import { useContracts, useUsers } from "../../../hooks";
import { PaymentStatus, type UserPublicData } from "../../../types/database";
import { createPaymentSchema, type CreatePaymentFormData } from "../../../validations/forms";

function parseCurrency(value: string) {
  const normalizedValue = value
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  return Number(normalizedValue);
}

export default function CreatePayments() {
  const { data: contracts, loading: loadingContracts } = useContracts();
  const { fetchUsers } = useUsers();
  const [users, setUsers] = useState<UserPublicData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetchUsers()
      .then((data) => {
        if (mounted) {
          setUsers(data);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoadingUsers(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [fetchUsers]);

  const contractOptions = useMemo(
    () =>
      (contracts ?? []).map((contract) => ({
        id: contract.id,
        label: contract.property?.title ?? `Contrato ${contract.id}`,
        description: contract.client?.name ?? contract.status,
      })),
    [contracts],
  );

  const userOptions = useMemo(
    () =>
      users.map((user) => ({
        id: user.id,
        label: user.name,
        description: user.email,
      })),
    [users],
  );

  return (
    <CreateForm
      schema={createPaymentSchema}
      title="Criar Pagamento"
      description="Registre um novo pagamento vinculado ao cliente e contrato correspondente."
      backUrl="/admin/payments"
      submitUrl="/admin/payments"
      redirectUrl="/admin/payments"
      submitLabel="Salvar pagamento"
      fields={[
        {
          name: "contractId",
          label: "Contrato",
          type: "relation",
          required: true,
          relationOptions: contractOptions,
          relationLoading: loadingContracts,
          relationSearchPlaceholder: "Buscar contrato por imóvel, cliente ou ID",
        },
        {
          name: "userId",
          label: "Usuário",
          type: "relation",
          required: true,
          relationOptions: userOptions,
          relationLoading: loadingUsers,
          relationSearchPlaceholder: "Buscar usuário por nome, e-mail ou ID",
        },
        { name: "amount", label: "Valor", type: "text", required: true, placeholder: "R$ 2.500,00" },
        { name: "dueDate", label: "Data de vencimento", type: "date", required: true },
        { name: "paidDate", label: "Data de pagamento", type: "date" },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          defaultValue: PaymentStatus.PENDING,
          options: [
            { value: PaymentStatus.PENDING, label: "Pendente" },
            { value: PaymentStatus.COMPLETED, label: "Concluído" },
            { value: PaymentStatus.FAILED, label: "Falhou" },
            { value: PaymentStatus.REFUNDED, label: "Reembolsado" },
          ],
        },
        { name: "stripeIntent", label: "Stripe Payment Intent", type: "text", placeholder: "pi_..." },
        { name: "stripeInvoice", label: "Stripe Invoice", type: "text", placeholder: "in_..." },
      ]}
      transformPayload={(data: CreatePaymentFormData) => ({
        contractId: data.contractId,
        userId: data.userId,
        amount: parseCurrency(data.amount),
        dueDate: data.dueDate,
        paidDate: data.paidDate || null,
        status: data.status,
        stripePaymentIntentId: data.stripeIntent || null,
        stripeInvoiceId: data.stripeInvoice || null,
      })}
    />
  );
}
