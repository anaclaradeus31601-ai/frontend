import { EditForm } from "#components/shared/edit-form";
import type { UserPublicData } from "../../types/database";
import { apiRequest } from "../../lib/api";
import { editClientSchema, type EditClientFormData } from "../../validations/forms";
import { useAuth } from "../../contexts/auth-context";
import { useEffect, useState } from "react";

export default function Profile() {
    const { user, setUser, loading } = useAuth();
    const [profileUser, setProfileUser] = useState<UserPublicData | null>(user);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    useEffect(() => {
        if (loading) {
            return;
        }

        let isMounted = true;

        const loadProfile = async () => {
            try {
                const currentUser = await apiRequest<UserPublicData>("/users/me");

                if (!isMounted) {
                    return;
                }

                setProfileUser(currentUser);
                setUser(currentUser);
            } catch {
                if (!isMounted) {
                    return;
                }

                setProfileUser(user);
            } finally {
                if (isMounted) {
                    setIsLoadingProfile(false);
                }
            }
        };

        loadProfile();

        return () => {
            isMounted = false;
        };
    }, [loading, setUser, user]);

    if (loading || isLoadingProfile) {
        return <div className="p-6">Carregando perfil...</div>;
    }

    if (!profileUser) {
        return <div className="p-6">Não foi possível carregar o perfil.</div>;
    }

    return (
        <div className="p-6">
            <h2 className="font-bold tracking-tight">Perfil</h2>
            <EditForm
                key={profileUser.id}
                title="Editar perfil"
                description="Atualize as informações do seu perfil"
                schema={editClientSchema}
                submitLabel="Salvar alterações"
                onSubmit={async (data: EditClientFormData) => {
                    const updatedUser = await apiRequest<UserPublicData>("/users/me", {
                        method: "PATCH",
                        body: JSON.stringify({
                            name: data.name,
                            email: data.email,
                            phone: data.phone || null,
                            birthDate: data.birthDate || null,
                            budget: data.budget || null,
                            city: data.city || null,
                            notes: data.notes || null,
                        }),
                    });

                    setProfileUser(updatedUser);
                    setUser(updatedUser);
                }}
                initialValues={{
                    name: profileUser.name ?? "",
                    email: profileUser.email ?? "",
                    phone: profileUser.phone ?? "",
                    cpf: "",
                    birthDate: profileUser.birthDate ?? "",
                    budget: profileUser.budget ?? "",
                    city: profileUser.city ?? "",
                    notes: profileUser.notes ?? "",
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
            ></EditForm>
        </div>
    )
}
