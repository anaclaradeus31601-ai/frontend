import { useCallback } from "react";
import { useAuth } from "../contexts/auth-context";
import type { User } from "../types/database";

export function useLogin() {
  const { user: currentUser } = useAuth();

  const login = useCallback((user: User) => {
    // Armazenar usuário no localStorage
    localStorage.setItem("auth_user", JSON.stringify(user));
    // Recarregar a página para o contexto atualizar
    window.location.href = user.role === "ADMIN" ? "/admin" : user.role === "REALTOR" ? "/realtor" : "/";
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_user");
    window.location.href = "/login";
  }, []);

  return { login, logout, currentUser };
}
