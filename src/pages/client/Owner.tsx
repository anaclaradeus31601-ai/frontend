import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ownerLandingSchema } from "../../validations/forms";

export default function CreateOwner() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpfCnpj: "",
    address: "",
  });

  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = ownerLandingSchema.safeParse(form);

    if (!result.success) {
      window.alert(result.error.issues[0]?.message ?? "Revise os campos do formulário.");
      return;
    }

    console.log(form);
    navigate("/preview");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-8">

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Container */}
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Cadastrar proprietário
          </h1>

          <p className="text-zinc-400 mt-1 text-sm">
            Adicione os dados do dono do imóvel.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white/5
            border
            border-white/10
            backdrop-blur-xl
            rounded-2xl
            p-6
            space-y-4
          "
        >

          {/* Nome */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Nome completo
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="João Silva"
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
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  focus:border-blue-500
                "
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@email.com"
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
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  focus:border-blue-500
                "
              />
            </div>
          </div>

          {/* Telefone */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Telefone
            </label>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
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
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  focus:border-blue-500
                "
              />
            </div>
          </div>

          {/* CPF/CNPJ */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              CPF ou CNPJ
            </label>

            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

              <input
                type="text"
                name="cpfCnpj"
                value={form.cpfCnpj}
                onChange={handleChange}
                placeholder="000.000.000-00"
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
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  focus:border-blue-500
                "
              />
            </div>
          </div>

          {/* Endereço */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Endereço
            </label>

            <div className="relative">
              <MapPin className="absolute left-3 top-4 w-4 h-4 text-zinc-500" />

              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Rua, número, bairro..."
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
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  focus:border-blue-500
                "
              />
            </div>
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
              font-medium
              text-black
              transition
              hover:bg-zinc-200
            "
          >
            Cadastrar proprietário
          </button>
        </form>
      </div>
    </div>
  );
}
