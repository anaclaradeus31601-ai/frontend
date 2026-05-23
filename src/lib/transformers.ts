// lib/transformers.ts
import type { User, UserPublicData, UserRole } from "../types/database";

// Transforma dados públicos no formato completo (para formulários de admin)
export function toUserFormData(publicData: UserPublicData & { createdAt?: string; updatedAt?: string }): Partial<User> {
  return {
    ...publicData,
    emailVerified: false,
    password: undefined,
    // Aqui você pode adicionar transformações específicas, como formatação de datas, etc.
    createdAt: publicData.createdAt || new Date().toISOString(), // 👈 Data atual em formato ISO
    updatedAt: publicData.updatedAt || new Date().toISOString(),
  };
}

// Ou melhor, crie um tipo específico para formulários
export interface UserFormData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  // Campos que só existem no formulário
  password?: string;
  confirmPassword?: string;
}