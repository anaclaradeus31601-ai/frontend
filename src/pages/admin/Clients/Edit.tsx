import { EditForm } from "#components/shared/edit-form";
import { useUserById } from "#hooks/use-users";
import { useParams } from "react-router-dom";
import { UserRole } from "../../../types/database";
import { editClientSchema, type EditClientFormData } from "../../../validations/forms";

export default function EditClients() {
  const { id } = useParams();
  const { data: client, isLoading } = useUserById(id);

  if (isLoading) {
    return <div className="p-6">Carregando cliente...</div>;
  }

  if (!client || client.role !== UserRole.CLIENT) {
    return <div className="p-6">Cliente não encontrado.</div>;
  }

  return (
    <EditForm
      key={client.id}
      schema={editClientSchema}
      title="Editar Cliente"
      description={`Atualize os dados do cliente ${id ? `#${id}` : ""}.`}
      backUrl="/admin/clients"
      submitUrl={id ? `/admin/users/${id}` : "/admin/users"}
      method="PATCH"
      redirectUrl="/admin/clients"
      submitLabel="Salvar alterações"
      initialValues={{
        name: client.name,
        email: client.email,
        phone: client.phone ?? "",
        cpf: "",
        birthDate: client.birthDate ?? "",
        budget: client.budget ?? "",
        city: client.city ?? "",
        notes: client.notes ?? "",
      }}
      fields={[
        { name: "name", label: "Nome completo", type: "text", required: true, span: "full" },
        { name: "cpf", label: "CPF", type: "text" },
        { name: "birthDate", label: "Data de nascimento", type: "date" },
        { name: "email", label: "E-mail", type: "email", required: true },
        { name: "phone", label: "Telefone", type: "tel" },
        { name: "budget", label: "Faixa de orçamento", type: "text", placeholder: "R$ 350.000,00" },
        { name: "city", label: "Cidade de interesse", type: "text" },
        { name: "notes", label: "Observações", type: "textarea", span: "full" },
      ]}
      transformPayload={(data: EditClientFormData) => ({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        birthDate: data.birthDate || null,
        budget: data.budget || null,
        city: data.city || null,
        notes: data.notes || null,
        role: UserRole.CLIENT,
      })}
    />
  );
}
