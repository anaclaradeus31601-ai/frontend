import { EditForm } from "#components/shared/edit-form";
import { useUserById } from "#hooks/use-users";
import { useParams } from "react-router-dom";
import { UserRole } from "../../../types/database";
import { editRealtorSchema } from "../../../validations/forms";

export default function EditRealtors() {
  const { id } = useParams();
  const { data: realtor, isLoading } = useUserById(id);

  if (isLoading) {
    return <div className="p-6">Carregando corretor...</div>;
  }

  if (!realtor || realtor.role !== UserRole.REALTOR) {
    return <div className="p-6">Corretor não encontrado.</div>;
  }

  return (
    <EditForm
      key={realtor.id}
      schema={editRealtorSchema}
      title="Editar Corretor"
      description={`Atualize o perfil do corretor ${id ? `#${id}` : ""}.`}
      backUrl="/admin/realtors"
      submitUrl={id ? `/admin/users/${id}` : "/admin/users"}
      method="PATCH"
      redirectUrl="/admin/realtors"
      submitLabel="Salvar alterações"
      initialValues={{
        name: realtor.name,
        email: realtor.email,
        phone: realtor.phone ?? "",
        cpf: "",
        creci: "",
        specialty: "",
        bio: "",
      }}
      fields={[
        { name: "name", label: "Nome completo", type: "text", required: true, span: "full" },
        { name: "email", label: "E-mail", type: "email", required: true },
        { name: "phone", label: "Telefone", type: "tel" },
        { name: "cpf", label: "CPF", type: "text" },
        { name: "creci", label: "CRECI", type: "text" },
        {
          name: "specialty",
          label: "Especialidade",
          type: "select",
          options: [
            { value: "rent", label: "Locação" },
            { value: "sale", label: "Venda" },
            { value: "high-standard", label: "Alto padrão" },
            { value: "commercial", label: "Comercial" },
          ],
        },
        { name: "bio", label: "Bio", type: "textarea", span: "full" },
      ]}
      transformPayload={(data: any) => ({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        avatar: realtor.avatar ?? null,
        role: UserRole.REALTOR,
      })}
    />
  );
}
