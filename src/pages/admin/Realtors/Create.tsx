import { CreateForm } from "../../../components/shared/create-form";
import { createRealtorSchema, type CreateRealtorFormData } from "../../../validations/forms";
import { UserRole } from "../../../types/database";

export default function CreateRealtors() {
  return (
    <CreateForm
      schema={createRealtorSchema}
      title="Criar Corretor"
      description="Cadastre um novo corretor no sistema"
      backUrl="/admin/realtors"
      submitUrl="/admin/users"
      redirectUrl="/admin/realtors"
      submitLabel="Salvar corretor"
      initialValues={{
        role: UserRole.REALTOR,
      }}
      fields={[
        { name: "name", label: "Nome", type: "text", placeholder: "Nome completo", required: true },
        { name: "email", label: "E-mail", type: "email", placeholder: "corretor@email.com", required: true },
        { name: "phone", label: "Telefone", type: "tel", placeholder: "(11) 99999-9999" },
        { name: "password", label: "Senha", type: "password", placeholder: "Mínimo 6 caracteres", required: true },
        { name: "avatar", label: "Avatar", type: "url", placeholder: "https://...", span: "full" },
      ]}
      transformPayload={(data: CreateRealtorFormData) => ({
        ...data,
        role: UserRole.REALTOR,
        phone: data.phone || null,
        avatar: data.avatar || null,
        emailVerified:
          typeof data.emailVerified === "boolean"
            ? data.emailVerified
            : false,
      })}
    />
  );
}
