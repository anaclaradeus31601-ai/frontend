import { AuthLoginForm } from "../../components/auth/auth-login-form";
import { UserRole } from "../../types/database";

export default function RealtorLogin() {
  return (
    <AuthLoginForm
      title="Login do Corretor"
      subtitle="Acesse sua área comercial"
      expectedRole={UserRole.REALTOR}
    />
  );
}
