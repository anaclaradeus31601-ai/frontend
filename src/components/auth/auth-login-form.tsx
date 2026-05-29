import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks/use-login";
import { loginSchema, type LoginFormData } from "../../validations/forms";
import type { UserRole } from "../../types/database";

interface AuthLoginFormProps {
  title: string;
  subtitle: string;
  expectedRole?: UserRole;
  registerLink?: boolean;
}

const inputBaseClass =
  "w-full rounded-lg border px-4 py-2 text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2";

export function AuthLoginForm({
  title,
  subtitle,
  expectedRole,
  registerLink = false,
}: AuthLoginFormProps) {
  const location = useLocation();
  const { login, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(
        {
          email: data.email,
          password: data.password,
        },
        { expectedRole },
      );
    } catch (error: any) {
      if (error.status === 401) {
        setError("root", {
          message: "E-mail ou senha inválidos."
        });
      } else if (error.status === 403) {
        setError("root", {
          message: error.message,
        });
      } else {
        setError("root", {
          message: "Erro ao fazer login. Tente novamente."
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">{title}</h1>
        <p className="text-gray-500 text-center mb-8">{subtitle}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md space-y-4">
          {location.state?.message && (
            <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
              {location.state.message as string}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              className={`${inputBaseClass} ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                {...register("password")}
                className={`${inputBaseClass} pr-10 ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {errors.root && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {errors.root.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting || isLoading ? "Entrando..." : "Entrar"}
          </button>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Esqueci minha senha
            </Link>
          </div>

          {registerLink && (
            <div className="space-y-2 text-center text-sm text-gray-600">
              <p>
                Não tem conta?{" "}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700">
                  Criar conta
                </Link>
              </p>
              <p>
                Precisa confirmar seu e-mail?{" "}
                <Link
                  to="/verify-email/request"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Reenviar confirmação
                </Link>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
