import { CreateForm } from "#components/shared/create-form";
import { createOwnerSchema } from "../../../validations/forms";

export default function CreateOwners() {
  return (
    <CreateForm
      schema={createOwnerSchema}
      title="Criar Proprietário"
      description="Cadastre um novo proprietário para gerenciar imóveis e receber pagamentos."
      backUrl="/admin/owners"
      submitUrl="/admin/owners"
      redirectUrl="/admin/owners"
      submitLabel="Salvar proprietário"
      fields={[
        { name: "name", label: "Nome", type: "text", placeholder: "Nome completo", required: true },
        { name: "cpfCnpj", label: "CPF/CNPJ", type: "text", placeholder: "000.000.000-00 / 00.000.000/0000-00", required: true },
        { name: "email", label: "E-mail", type: "email", placeholder: "proprietario@email.com", required: true },
        { name: "phone", label: "Telefone", type: "tel", placeholder: "(11) 99999-9999", required: true },
        { name: "address", label: "Endereço", type: "text", placeholder: "Rua, número e complemento", span: "full" },
      ]}
    />
  );
}
