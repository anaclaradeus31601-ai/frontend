import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Building2, Mail, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(email, senha);

    navigate("/");
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
          <div className="absolute inset-0 bg-black/55" />

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

            {/* Bottom text */}
            <div className="max-w-lg">
              <h2 className="text-5xl font-bold leading-tight text-white">
                Gerencie imóveis, contratos e clientes em um só lugar.
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
            onSubmit={handleLogin}
            className="
              relative
              z-10
              w-full
              max-w-md
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-2xl
              px-8
              shadow-2xl
            "
          >

            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-3 mb-8">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <Building2 className="text-white w-6 h-6" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-white">
                  EstateFlow
                </h1>

                <p className="text-xs text-zinc-400">
                  Real Estate Platform
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="mb-4 mt-4 flex items-center justify-center flex-col">
              <h2 className="text-2xl font-bold text-white">
                Entrar
              </h2>

              <p className="text-zinc-400 mt-2">
                Acesse sua conta para continuar.
              </p>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="text-sm text-zinc-300 mb-2 block">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

                <input
                  required
                  type="email"
                  placeholder="seuemail@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  py-3
                  pl-10
                  pr-4
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

            {/* Password */}
            <div className="mb-4">
              <label className="text-sm text-zinc-300 mb-2 block">
                Senha
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="
        w-full
        rounded-xl
        border
        border-white/10
        bg-black/20
        py-3
        pl-10
        pr-4
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

            {/* Options */}
            <div className="mb-6 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-zinc-400">
                <input type="checkbox" />
                Lembrar-me
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-400 hover:text-blue-300"
              >
                Esqueci minha senha
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="
    w-full
    rounded-xl
    bg-white
    py-3
    text-sm
    font-semibold
    text-black
    transition
    hover:bg-zinc-200
    active:scale-[0.99]
  "
            >
              Entrar
            </button>

            {/* Divider */}
            <div className="my-2 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-sm text-zinc-500">
                ou
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="
    w-full
    rounded-xl
    border
    border-white/10
    bg-white/5
    py-3
    text-sm
    text-white
    transition
    hover:bg-white/10
  "
            >
              Continuar com Google
            </button>

            {/* Footer */}
            <p className="mt-8 p-4 text-center text-sm text-zinc-500">
              Ainda não possui conta? {""}
              <Link
                to="/register"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Criar conta
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}