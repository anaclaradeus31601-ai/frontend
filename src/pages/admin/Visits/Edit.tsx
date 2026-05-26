import { EditForm } from "#components/shared/edit-form";
import { useClients, useRealtors } from "#hooks/use-users";
import { useProperties } from "../../../hooks/use-properties";
import { useVisitById } from "../../../hooks/use-visit-queries";
import { VisitStatus } from "../../../types/database";
import { createVisitSchema, type CreateVisitFormData } from "../../../validations/forms";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

function toDatetimeLocal(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}

export default function EditVisits() {
  const { id } = useParams();
  const { data: visit, isLoading: loadingVisit } = useVisitById(id);
  const { data: properties, loading: loadingProperties } = useProperties();
  const { data: clients, isLoading: loadingClients } = useClients();
  const { data: realtors, isLoading: loadingRealtors } = useRealtors();

  const propertyOptions = useMemo(() =>
    properties.map((property) => ({
      id: property.id,
      label: property.title,
      description: `${property.city}, ${property.neighborhood}`,
    })), [properties]);

  const clientOptions = useMemo(() =>
    (clients ?? []).map((client) => ({
      id: client.id,
      label: client.name,
      description: client.email,
    })), [clients]);

  const realtorOptions = useMemo(() =>
    (realtors ?? []).map((realtor) => ({
      id: realtor.id,
      label: realtor.name,
      description: realtor.email,
    })), [realtors]);

  if (loadingVisit) {
    return <div className="p-6">Carregando visita...</div>;
  }

  if (!visit) {
    return <div className="p-6">Visita não encontrada.</div>;
  }

  return (
    <EditForm
      key={visit.id}
      schema={createVisitSchema}
      title="Editar Visita"
      description={`Ajuste o agendamento da visita ${id ? `#${id}` : ""}.`}
      backUrl="/admin/visits"
      submitUrl={id ? `/admin/visit/${id}` : "/admin/visit"}
      redirectUrl="/admin/visits"
      submitLabel="Salvar alterações"
      initialValues={{
        propertyId: visit.propertyId,
        clientId: visit.clientId,
        realtorId: visit.realtorId,
        status: visit.status,
        scheduledAt: toDatetimeLocal(visit.scheduledAt),
        duration: visit.duration ?? 60,
        notes: visit.notes ?? "",
        feedback: visit.feedback ?? "",
      }}
      fields={[
        {
          name: "propertyId",
          label: "Imóvel",
          type: "relation",
          required: true,
          relationOptions: propertyOptions,
          relationLoading: loadingProperties,
        },
        {
          name: "clientId",
          label: "Cliente",
          type: "relation",
          required: true,
          relationOptions: clientOptions,
          relationLoading: loadingClients,
        },
        {
          name: "realtorId",
          label: "Corretor",
          type: "relation",
          required: true,
          relationOptions: realtorOptions,
          relationLoading: loadingRealtors,
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { value: VisitStatus.SCHEDULED, label: "Agendada" },
            { value: VisitStatus.COMPLETED, label: "Concluída" },
            { value: VisitStatus.CANCELLED, label: "Cancelada" },
            { value: VisitStatus.NO_SHOW, label: "Não compareceu" },
          ],
        },
        { name: "scheduledAt", label: "Data e hora", type: "datetime-local", required: true },
        { name: "duration", label: "Duração (minutos)", type: "number", placeholder: "60" },
        { name: "notes", label: "Observações", type: "textarea", span: "full" },
        { name: "feedback", label: "Feedback", type: "textarea", span: "full" },
      ]}
      transformPayload={(data: CreateVisitFormData) => ({
        ...data,
        duration: data.duration ? Number(data.duration) : null,
        scheduledAt: new Date(data.scheduledAt).toISOString(),
      })}
    />
  );
}
