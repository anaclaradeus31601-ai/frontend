import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Building2,
  Mail,
  Lock,
  User,
  Phone,
} from "lucide-react";
import { registerSchema } from "../../validations/client-forms";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = registerSchema.safeParse({
      name,
      email,
      phone,
      password,
      confirmPassword,
    });

    if (!result.success) {
      window.alert(result.error.issues[0]?.message ?? "Revise os campos do formulário.");
      return;
    }

    console.log({
      name,
      email,
      phone,
      password,
    });

    navigate("/login");
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
            onSubmit={handleRegister}
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
              <label className="text-xs text-zinc-300 mb-1 block">
                Nome
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />

                <input
                  required
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="
          w-full
          rounded-lg
          border
          border-white/10
          bg-black/20
          py-2.5
          pl-9
          pr-3
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

            {/* Email */}
            <div className="mb-3">
              <label className="text-xs text-zinc-300 mb-1 block">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />

                <input
                  required
                  type="email"
                  placeholder="email@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
          w-full
          rounded-lg
          border
          border-white/10
          bg-black/20
          py-2.5
          pl-9
          pr-3
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

            {/* Telefone */}
            <div className="mb-3">
              <label className="text-xs text-zinc-300 mb-1 block">
                Telefone
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />

                <input
                  required
                  type="text"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="
          w-full
          rounded-lg
          border
          border-white/10
          bg-black/20
          py-2.5
          pl-9
          pr-3
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

            {/* Senha */}
            <div className="mb-3">
              <label className="text-xs text-zinc-300 mb-1 block">
                Senha
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />

                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
          w-full
          rounded-lg
          border
          border-white/10
          bg-black/20
          py-2.5
          pl-9
          pr-3
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
              <label className="text-xs text-zinc-300 mb-1 block">
                Confirmar senha
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />

                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="
          w-full
          rounded-lg
          border
          border-white/10
          bg-black/20
          py-2.5
          pl-9
          pr-3
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

            {/* Button */}
            <button
              type="submit"
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
    "
            >
              Criar conta
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
