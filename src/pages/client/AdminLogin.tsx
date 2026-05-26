import { AuthLoginForm } from "../../components/auth/auth-login-form";
import { UserRole } from "../../types/database";

export default function AdminLogin() {
  return (
    <AuthLoginForm
      title="Login Administrativo"
      subtitle="Área exclusiva para administradores"
      expectedRole={UserRole.ADMIN}
    />
  );
}
