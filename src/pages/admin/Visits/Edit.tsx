import { EditForm } from "#components/shared/edit-form";
import { useParams } from "react-router-dom";
import { editVisitSchema } from "../../../validations/forms";

export default function EditVisits() {
  const { id } = useParams();

  return (
    <EditForm
      schema={editVisitSchema}
      title="Editar Visita"
      description={`Ajuste o agendamento da visita ${id ? `#${id}` : ""}.`}
      backUrl="/admin/visits"
      submitUrl={id ? `/admin/visits/${id}` : "/admin/visits"}
      redirectUrl="/admin/visits"
      submitLabel="Salvar alterações"
      initialValues={{
        property: "Apartamento 101",
        client: "João Silva",
        realtor: "Carlos Pereira",
        status: "scheduled",
        date: "2026-05-21",
        time: "14:00",
        notes: "Cliente solicitou visita no período da tarde e quer avaliar vagas de garagem.",
      }}
      fields={[
        { name: "property", label: "Imóvel", type: "text", required: true },
        { name: "client", label: "Cliente", type: "text", required: true },
        { name: "realtor", label: "Corretor", type: "text", required: true },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { value: "scheduled", label: "Agendada" },
            { value: "completed", label: "Concluída" },
            { value: "cancelled", label: "Cancelada" },
          ],
        },
        { name: "date", label: "Data", type: "date", required: true },
        { name: "time", label: "Hora", type: "text", required: true, placeholder: "14:00" },
        { name: "notes", label: "Observações", type: "textarea", span: "full" },
      ]}
    />
  );
}
