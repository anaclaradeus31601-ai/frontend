import { EditForm } from "#components/shared/edit-form";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { usePropertiesByRealtor } from "../../hooks/use-public-properties";
import { useVisitById } from "../../hooks/use-visit-queries";
import { VisitStatus } from "../../types/database";
import { createVisitSchema, type CreateVisitFormData } from "../../validations/forms";

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

export default function RealtorEditVisit() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const { data: visit, isLoading: loadingVisit } = useVisitById(id);
  const { data: properties, isLoading: loadingProperties } = usePropertiesByRealtor(user?.id);

  const propertyOptions = useMemo(
    () =>
      properties?.map((property) => ({
        id: property.id,
        label: property.title,
        description: `${property.city}, ${property.neighborhood}`,
      })) ?? [],
    [properties],
  );

  const realtorOptions = useMemo(
    () => (user ? [{ id: user.id, label: user.name, description: user.email }] : []),
    [user],
  );

  if (authLoading || loadingVisit) {
    return <div className="p-6">Carregando...</div>;
  }

  if (!visit) {
    return <div className="p-6">Visita não encontrada.</div>;
  }

  return (
    <EditForm
      schema={createVisitSchema}
      title="Editar Visita"
      description={`Atualize os dados da visita ${id ? `#${id}` : ""}.`}
      backUrl="/realtor/visits"
      submitUrl={id ? `/admin/visit/${id}` : "/admin/visit"}
      redirectUrl="/realtor/visits"
      submitLabel="Salvar alterações"
      method="PATCH"
      key={visit.id}
      initialValues={{
        propertyId: visit.propertyId,
        clientId: visit.clientId,
        realtorId: visit.realtorId,
        status: visit.status ?? VisitStatus.SCHEDULED,
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
          relationSearchPlaceholder: "Buscar imóvel por título ou cidade",
        },
        {
          name: "clientId",
          label: "ID do cliente",
          type: "text",
          required: true,
          placeholder: "Cole o ID do cliente",
        },
        {
          name: "realtorId",
          label: "Corretor responsável",
          type: "relation",
          required: true,
          relationOptions: realtorOptions,
          relationSearchPlaceholder: "Corretor logado",
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
        realtorId: user?.id ?? data.realtorId,
        duration: data.duration ?? 60,
        scheduledAt: new Date(data.scheduledAt).toISOString(),
      })}
    />
  );
}
