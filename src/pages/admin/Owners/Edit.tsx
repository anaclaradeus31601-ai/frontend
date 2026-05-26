import { EditForm } from "#components/shared/edit-form";
import { useOwnerById } from "../../../hooks/use-public-properties";
import { useParams } from "react-router-dom";
import { editOwnerSchema, type EditOwnerFormData } from "../../../validations/forms";

export default function EditOwners() {
  const { id } = useParams();
  const { data: owner, isLoading } = useOwnerById(id);

  if (isLoading) {
    return <div className="p-6">Carregando proprietário...</div>;
  }

  if (!owner) {
    return <div className="p-6">Proprietário não encontrado.</div>;
  }

  const [street = "", number = "", neighborhood = "", city = "", state = ""] = (owner.address ?? "")
    .split(",")
    .map((value) => value.trim());

  return (
    <EditForm
      key={owner.id}
      schema={editOwnerSchema}
      title="Editar Proprietário"
      description={`Atualize os dados do proprietário ${id ? `#${id}` : ""}.`}
      backUrl="/admin/owners"
      submitUrl={id ? `/admin/owner/${id}` : "/admin/owner"}
      method="PATCH"
      redirectUrl="/admin/owners"
      submitLabel="Salvar alterações"
      initialValues={{
        name: owner.name,
        cpfCnpj: owner.cpfCnpj,
        email: owner.email,
        phone: owner.phone,
        street,
        number,
        neighborhood,
        city,
        state,
        notes: "",
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
      transformPayload={(data: EditOwnerFormData) => ({
        name: data.name,
        cpfCnpj: data.cpfCnpj,
        email: data.email,
        phone: data.phone,
        address: [data.street, data.number, data.neighborhood, data.city, data.state].filter(Boolean).join(", ") || null,
      })}
    />
  );
}
