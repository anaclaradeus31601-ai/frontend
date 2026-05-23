import { EditForm } from "#components/shared/edit-form";
import { useParams } from "react-router-dom";
import { editOwnerSchema } from "../../../validations/forms";

export default function EditOwners() {
  const { id } = useParams();

  return (
    <EditForm
      schema={editOwnerSchema}
      title="Editar Proprietário"
      description={`Atualize os dados do proprietário ${id ? `#${id}` : ""}.`}
      backUrl="/admin/owners"
      submitUrl={id ? `/admin/owners/${id}` : "/admin/owners"}
      redirectUrl="/admin/owners"
      submitLabel="Salvar alterações"
      initialValues={{
        name: "Maria Oliveira",
        cpfCnpj: "000.000.000-00",
        email: "proprietario@email.com",
        phone: "(11) 99999-9999",
        rg: "00.000.000-0",
        street: "Rua das Palmeiras",
        number: "123",
        neighborhood: "Centro",
        city: "Florianópolis",
        state: "SC",
        notes: "Prefere contato por WhatsApp e possui mais de um imóvel em negociação.",
      }}
      fields={[
        { name: "name", label: "Nome completo", type: "text", required: true, span: "full" },
        { name: "cpfCnpj", label: "CPF/CNPJ", type: "text", required: true },
        { name: "email", label: "E-mail", type: "email", required: true },
        { name: "phone", label: "Telefone", type: "tel", required: true },
        { name: "rg", label: "RG", type: "text" },
        { name: "street", label: "Rua", type: "text", span: "full" },
        { name: "number", label: "Número", type: "text" },
        { name: "neighborhood", label: "Bairro", type: "text" },
        { name: "city", label: "Cidade", type: "text" },
        { name: "state", label: "Estado", type: "text" },
        { name: "notes", label: "Observações", type: "textarea", span: "full" },
      ]}
    />
  );
}
