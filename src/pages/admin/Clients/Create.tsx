import { CreateForm } from "#components/shared/create-form";
import { UserRole } from "../../../types/database";
import { createClientSchema, type CreateClientFormData } from "../../../validations/forms";

export default function CreateClients() {
  return (
    <CreateForm
      schema={createClientSchema}
      title="Criar Cliente"
      description="Cadastre um novo cliente de acordo com os campos da tabela User."
      backUrl="/admin/clients"
      submitUrl="/admin/users"
      redirectUrl="/admin/clients"
      submitLabel="Salvar cliente"
      initialValues={{
        role: UserRole.CLIENT,
      }}
      fields={[
        { name: "name", label: "Nome", type: "text", placeholder: "João da Silva", required: true },
        { name: "email", label: "E-mail", type: "email", placeholder: "cliente@email.com", required: true },
        { name: "password", label: "Senha", type: "password", placeholder: "Senha inicial", required: true },
        { name: "phone", label: "Telefone", type: "tel", placeholder: "(11) 99999-9999" },
        {
          name: "emailVerified",
          label: "E-mail verificado",
          type: "select",
          options: [
            { value: "true", label: "Sim" },
            { value: "false", label: "Não" },
          ],
        },
        { name: "avatar", label: "Avatar", type: "url", placeholder: "https://...", span: "full" },
      ]}
      transformPayload={(data: CreateClientFormData) => ({
        ...data,
        role: UserRole.CLIENT,
        phone: data.phone || null,
        avatar: data.avatar || null,
        emailVerified:
          typeof data.emailVerified === "boolean"
            ? data.emailVerified
            : data.emailVerified === "true",
      })}
    />
  );
}
