import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { Input } from "#components/ui/input";
import { Label } from "#components/ui/label";
import { useAuth } from "../../contexts/auth-context";
import { apiRequest } from "../../lib/api";
import type { UserPublicData } from "../../types/database";
import { useState } from "react";

export default function RealtorProfile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    avatar: user?.avatar ?? "",
  });
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    try {
      const updatedUser = await apiRequest<UserPublicData>("/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          ...form,
          phone: form.phone || null,
          avatar: form.avatar || null,
        }),
      });

      setUser(updatedUser);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Meu Perfil</h2>
        <p className="text-sm text-muted-foreground">Dados do corretor logado.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informações pessoais</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" value={form.phone} onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <Input id="avatar" value={form.avatar} onChange={(event) => setForm((current) => ({ ...current, avatar: event.target.value }))} />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" disabled={isSaving}>{isSaving ? "Salvando..." : "Salvar perfil"}</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
