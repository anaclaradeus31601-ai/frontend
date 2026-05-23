import { EditForm } from "#components/shared/edit-form";
import { useParams } from "react-router-dom";
import { editRealtorSchema } from "../../../validations/forms";

export default function EditRealtors() {
  const { id } = useParams();

  return (
    <EditForm
      schema={editRealtorSchema}
      title="Editar Corretor"
      description={`Atualize o perfil do corretor ${id ? `#${id}` : ""}.`}
      backUrl="/admin/realtors"
      submitUrl={id ? `/admin/realtors/${id}` : "/admin/realtors"}
      redirectUrl="/admin/realtors"
      submitLabel="Salvar alterações"
      initialValues={{
        name: "Ana Costa",
        email: "corretor@email.com",
        phone: "(11) 99999-9999",
        cpf: "000.000.000-00",
        creci: "123456-F",
        specialty: "sale",
        bio: "Especialista em imóveis residenciais e atendimento consultivo para primeira compra.",
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
    />
  );
}
