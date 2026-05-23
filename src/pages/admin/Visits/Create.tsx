// pages/admin/Visits/Create.tsx
import { CreateForm } from "../../../components/shared/create-form";
import { useProperties } from "../../../hooks/use-properties";
import { createVisitSchema } from "../../../validations/forms";
import { VisitStatus } from "../../../types/database";
import { useMemo } from "react";
import { useClients, useRealtors } from "#hooks/use-users";

export default function CreateVisits() {
  // ✅ Usa hooks com React Query (retorna { data, isLoading })
  const { data: properties, loading: loadingProperties } = useProperties();
  const { data: clients, isLoading: loadingClients } = useClients();
  const { data: realtors, isLoading: loadingRealtors } = useRealtors();

  // ✅ useMemo para transformar dados (não async, não causa re-render infinito)
  const propertyOptions = useMemo(() => 
    properties?.map((property) => ({
      id: property.id,
      label: property.title,
      description: `${property.city}, ${property.neighborhood}`,
    })) ?? []
  , [properties]);

  const clientOptions = useMemo(() => 
    clients?.map((client) => ({
      id: client.id,
      label: client.name,
      description: client.email,
    })) ?? []
  , [clients]);

  const realtorOptions = useMemo(() => 
    realtors?.map((realtor) => ({
      id: realtor.id,
      label: realtor.name,
      description: realtor.email,
    })) ?? []
  , [realtors]);

  return (
    <CreateForm
      schema={createVisitSchema}
      title="Criar Visita"
      description="Agende uma visita com cliente, corretor e imóvel."
      backUrl="/admin/visits"
      submitUrl="/admin/visits"
      redirectUrl="/admin/visits"
      submitLabel="Salvar visita"
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
          label: "Cliente",
          type: "relation",
          required: true,
          relationOptions: clientOptions,
          relationLoading: loadingClients,
          relationSearchPlaceholder: "Buscar cliente por nome ou e-mail",
        },
        {
          name: "realtorId",
          label: "Corretor",
          type: "relation",
          required: true,
          relationOptions: realtorOptions,
          relationLoading: loadingRealtors,
          relationSearchPlaceholder: "Buscar corretor por nome ou e-mail",
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
        {
          name: "scheduledAt",
          label: "Data e hora",
          type: "datetime-local",
          required: true,
        },
        {
          name: "duration",
          label: "Duração (minutos)",
          type: "number",
          placeholder: "60",
        },
        {
          name: "notes",
          label: "Observações",
          type: "textarea",
          span: "full",
        },
        {
          name: "feedback",
          label: "Feedback",
          type: "textarea",
          span: "full",
        },
      ]}
      transformPayload={(data: any) => {
        return {
          ...data,
          duration: data.duration ? Number(data.duration) : null,
          scheduledAt: new Date(data.scheduledAt).toISOString(),
        };
      }}
    />
  );
}