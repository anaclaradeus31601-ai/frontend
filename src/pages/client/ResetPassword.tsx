import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "../../lib/api";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../../validations/forms";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: searchParams.get("token") ?? "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const response = await apiRequest<{ message: string }>(
        "/users/forgot-password/confirm",
        {
          method: "POST",
          body: JSON.stringify({
            token: data.token,
            newPassword: data.newPassword,
          }),
        },
      );

      setSuccessMessage(response.message);

      window.setTimeout(() => {
        navigate("/login", {
          state: { message: "Senha atualizada com sucesso. Faça login novamente." },
        });
      }, 1200);
    } catch {
      setError("root", {
        message: "Token inválido ou expirado. Solicite uma nova recuperação.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Redefinir senha
        </h1>
        <p className="mb-8 text-center text-gray-500">
          Defina uma nova senha para acessar sua conta.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="token" className="mb-1 block text-sm font-medium text-gray-700">
              Token
            </label>
            <textarea
              id="token"
              rows={4}
              placeholder="Cole o token recebido"
              {...register("token")}
              className={`w-full rounded-lg border px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                errors.token
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.token && (
              <p className="mt-1 text-sm text-red-500">{errors.token.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="newPassword" className="mb-1 block text-sm font-medium text-gray-700">
              Nova senha
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="NovaSenha@123"
                {...register("newPassword")}
                className={`w-full rounded-lg border px-4 py-2 pr-10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  errors.newPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
              Confirmar senha
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repita a nova senha"
                {...register("confirmPassword")}
                className={`w-full rounded-lg border px-4 py-2 pr-10 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          {errors.root && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {errors.root.message}
            </div>
          )}

          {successMessage && (
            <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Redefinindo..." : "Salvar nova senha"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Precisa de um novo token?{" "}
            <Link
              to="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Solicitar novamente
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
