import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  Mail,
  Lock,
  User,
  Phone,
} from "lucide-react";
import { useForm } from "../../hooks/use-form";
import { registerFormSchema, type RegisterFormData } from "../../validations/forms";

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm(registerFormSchema);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // TODO: Integrar com API de registro
      console.log("Register data:", data);
      // const response = await apiRequest("/auth/register", { method: "POST", body: JSON.stringify(data) });
      navigate("/login");
    } catch (error) {
      console.error("Register failed:", error);
    }
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-zinc-950">
      <div className="flex h-full w-full">

        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex w-1/2 overflow-hidden">

          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop"
            alt="Casa moderna"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between h-full p-12">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <Building2 className="text-white w-7 h-7" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">
                  EstateFlow
                </h1>

                <p className="text-sm text-zinc-300">
                  Real Estate Platform
                </p>
              </div>
            </div>

            {/* Text */}
            <div className="max-w-lg">
              <h2 className="text-5xl font-bold leading-tight text-white">
                Crie sua conta e comece a gerenciar imóveis.
              </h2>

              <p className="text-zinc-300 mt-6 text-lg leading-relaxed">
                Plataforma moderna para imobiliárias, corretores e gestão
                imobiliária profissional.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex w-full lg:w-1/2 items-center justify-center bg-zinc-950">

          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">

            <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl" />
          </div>

          {/* Card */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="
            relative
            z-10
            w-full
            max-w-lg
            rounded-2xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            px-6
            py-4
            shadow-2xl
          "
          >

            {/* Header */}
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-white">
                Criar conta
              </h2>

              <p className="text-zinc-400 mt-1 text-sm">
                Cadastre-se para continuar.
              </p>
            </div>

            {/* Nome */}
            <div className="mb-3">
              <label htmlFor="name" className="text-xs text-zinc-300 mb-1 block">
                Nome
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />

                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  {...register("name")}
                  className={`
          w-full
          rounded-lg
          border
          bg-black/20
          py-2.5
          pl-9
          pr-3
          text-sm
          text-white
          placeholder:text-zinc-500
          outline-none
          transition
          ${errors.name ? "border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"}
        `}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="text-xs text-zinc-300 mb-1 block">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />

                <input
                  id="email"
                  type="email"
                  placeholder="email@email.com"
                  {...register("email")}
                  className={`
          w-full
          rounded-lg
          border
          bg-black/20
          py-2.5
          pl-9
          pr-3
          text-sm
          text-white
          placeholder:text-zinc-500
          outline-none
          transition
          ${errors.email ? "border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"}
        `}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>}
            </div>

            {/* Telefone */}
            <div className="mb-3">
              <label htmlFor="phone" className="text-xs text-zinc-300 mb-1 block">
                Telefone
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />

                <input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  {...register("phone")}
                  className={`
          w-full
          rounded-lg
          border
          bg-black/20
          py-2.5
          pl-9
          pr-3
          text-sm
          text-white
          placeholder:text-zinc-500
          outline-none
          transition
          ${errors.phone ? "border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"}
        `}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-0.5">{errors.phone.message}</p>}
            </div>

            {/* Senha */}
            <div className="mb-3">
              <label htmlFor="password" className="text-xs text-zinc-300 mb-1 block">
                Senha
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />

                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`
          w-full
          rounded-lg
          border
          bg-black/20
          py-2.5
          pl-9
          pr-3
          text-sm
          text-white
          placeholder:text-zinc-500
          outline-none
          transition
          ${errors.password ? "border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"}
        `}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-0.5">{errors.password.message}</p>}
            </div>
          text-sm
          text-white
          placeholder:text-zinc-500
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
        "
                />
              </div>
            </div>

            {/* Confirmar senha */}
            <div className="mb-5">
              <label htmlFor="confirmPassword" className="text-xs text-zinc-300 mb-1 block">
                Confirmar senha
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className={`
          w-full
          rounded-lg
          border
          bg-black/20
          py-2.5
          pl-9
          pr-3
          text-sm
          text-white
          placeholder:text-zinc-500
          outline-none
          transition
          ${errors.confirmPassword ? "border-red-500 focus:ring-red-500/20" : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"}
        `}
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-0.5">{errors.confirmPassword.message}</p>}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
      w-full
      rounded-lg
      bg-white
      py-2.5
      text-sm
      font-medium
      text-black
      transition
      hover:bg-zinc-200
      active:scale-[0.99]
      disabled:opacity-50
      disabled:cursor-not-allowed
    "
            >
              {isSubmitting ? "Criando conta..." : "Criar conta"}
            </button>

            {/* Footer */}
            <p className="mt-5 text-center text-xs text-zinc-500">
              Já possui uma conta?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
