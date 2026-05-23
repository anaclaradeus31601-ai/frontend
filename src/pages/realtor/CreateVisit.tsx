import { CreateForm } from "#components/shared/create-form";
import { useMemo } from "react";
import { useAuth } from "../../contexts/auth-context";
import { usePropertiesByRealtor } from "../../hooks/use-public-properties";
import { VisitStatus } from "../../types/database";
import { createVisitSchema, type CreateVisitFormData } from "../../validations/forms";

export default function RealtorCreateVisit() {
  const { user, loading: authLoading } = useAuth();
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

  if (authLoading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <CreateForm
      schema={createVisitSchema}
      title="Nova Visita"
      description="Agende uma nova visita para um cliente da sua carteira."
      backUrl="/realtor/visits"
      submitUrl="/admin/visit"
      redirectUrl="/realtor/visits"
      submitLabel="Salvar visita"
      initialValues={{
        realtorId: user?.id ?? "",
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
          defaultValue: VisitStatus.SCHEDULED,
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
