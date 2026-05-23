import { EditForm } from "#components/shared/edit-form";
import { useParams } from "react-router-dom";
import { editClientSchema } from "../../../validations/forms";

export default function EditClients() {
  const { id } = useParams();

  return (
    <EditForm
      schema={editClientSchema}
      title="Editar Cliente"
      description={`Atualize os dados do cliente ${id ? `#${id}` : ""}.`}
      backUrl="/admin/clients"
      submitUrl={id ? `/admin/clients/${id}` : "/admin/clients"}
      redirectUrl="/admin/clients"
      submitLabel="Salvar alterações"
      initialValues={{
        name: "João da Silva",
        cpf: "000.000.000-00",
        birthDate: "1990-01-01",
        email: "cliente@email.com",
        phone: "(11) 99999-9999",
        budget: "R$ 350.000,00",
        city: "Florianópolis",
        notes: "Cliente com urgência de mudança e preferência por região central.",
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
    />
  );
}
