// pages/client/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "../../lib/api";
import  {type RegisterFormData, registerSchema } from "../../validations/forms";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword: _confirmPassword, ...registerData } = data;
      void _confirmPassword;

      await apiRequest("/users/register", {
        method: "POST",
        body: JSON.stringify({
          ...registerData,
        }),
      });

      navigate("/login", {
        state: { message: "Conta criada com sucesso! Faça login." }
      });
    } catch (error: any) {
      if (error.status === 409) {
        setError("email", {
          message: "Este e-mail já está em uso."
        });
      } else {
        setError("root", {
          message: "Erro ao criar conta. Tente novamente."
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">Criar Conta</h1>
        <p className="text-gray-500 text-center mb-8">Cadastre-se como cliente</p>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome"
              {...register("name")}
              className={`w-full px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                errors.name 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                errors.email 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              {...register("phone")}
              className={`w-full px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
                errors.phone 
                  ? "border-red-500 focus:ring-red-500" 
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                {...register("password")}
                className={`w-full px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 pr-10 ${
                  errors.password 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-blue-500"
                }`}
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

          {/* Confirmar Senha */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar senha
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repita a senha"
                {...register("confirmPassword")}
                className={`w-full px-4 py-2 border rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 pr-10 ${
                  errors.confirmPassword 
                    ? "border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Erro geral */}
          {errors.root && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {errors.root.message}
            </div>
          )}

          {/* Botão */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? "Criando conta..." : "Criar conta"}
          </button>

          {/* Link login */}
          <p className="text-center text-sm text-gray-600">
            Já tem conta?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Fazer login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
