import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "../../lib/api";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../../validations/forms";

type ForgotPasswordResponse = {
  message: string;
  resetToken?: string;
};

export default function ForgotPassword() {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<ForgotPasswordResponse | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await apiRequest<ForgotPasswordResponse>(
        "/users/forgot-password/request",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );

      setResult(response);
    } catch {
      setError("root", {
        message: "Não foi possível iniciar a recuperação agora.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Recuperar senha
        </h1>
        <p className="mb-8 text-center text-gray-500">
          Enviaremos um link seguro para redefinir sua senha.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              className={`w-full rounded-lg border px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {errors.root && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {errors.root.message}
            </div>
          )}

          {result && (
            <div className="space-y-3 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
              <p>{result.message}</p>
              {result.resetToken && (
                <div className="space-y-2">
                  <p className="font-medium">Token de desenvolvimento:</p>
                  <code className="block break-all rounded bg-white p-3 text-xs text-gray-700">
                    {result.resetToken}
                  </code>
                  <Link
                    to={`/reset-password?token=${encodeURIComponent(result.resetToken)}`}
                    className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Abrir tela de redefinição
                  </Link>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Enviando..." : "Enviar link"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Lembrou a senha?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700">
              Voltar ao login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
