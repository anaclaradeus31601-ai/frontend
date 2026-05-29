import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "../../lib/api";
import {
  confirmEmailVerificationSchema,
  type ConfirmEmailVerificationFormData,
} from "../../validations/forms";

export default function ConfirmEmailVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmEmailVerificationFormData>({
    resolver: zodResolver(confirmEmailVerificationSchema),
    defaultValues: {
      token: searchParams.get("token") ?? "",
    },
  });

  const onSubmit = async (data: ConfirmEmailVerificationFormData) => {
    try {
      const response = await apiRequest<{ message: string }>(
        "/users/verify-email/confirm",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      );

      setSuccessMessage(response.message);

      window.setTimeout(() => {
        navigate("/login", {
          state: { message: "E-mail confirmado com sucesso. Faça login." },
        });
      }, 1200);
    } catch {
      setError("root", {
        message: "Token inválido ou expirado. Solicite uma nova confirmação.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">
          Ativar conta
        </h1>
        <p className="mb-8 text-center text-gray-500">
          Cole o token recebido ou abra o link vindo do e-mail.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="token" className="mb-1 block text-sm font-medium text-gray-700">
              Token
            </label>
            <textarea
              id="token"
              rows={5}
              placeholder="Cole o token de confirmação"
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
            {isSubmitting ? "Confirmando..." : "Confirmar e-mail"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Não recebeu nada?{" "}
            <Link
              to="/verify-email/request"
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
