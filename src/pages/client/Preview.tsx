import { useState } from "react";
import {
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Car,
  Image,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { previewPropertySchema } from "../../validations/forms";

export default function CreateProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    neighborhood: "",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = previewPropertySchema.safeParse(form);

    if (!result.success) {
      window.alert(result.error.issues[0]?.message ?? "Revise os campos do formulário.");
      return;
    }

    console.log(form);
    navigate("/show-property");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-8">

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Container */}
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Anunciar imóvel
          </h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Preencha as informações do imóvel para publicar.
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
            space-y-5
          "
        >

          {/* Título */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Título do imóvel
            </label>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Casa moderna com piscina..."
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

          {/* Descrição */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Descrição
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Descreva o imóvel..."
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/20
                p-4
                text-sm
                outline-none
                resize-none
                focus:ring-2
                focus:ring-blue-500/20
                focus:border-blue-500
              "
            />
          </div>

          {/* Cidade e Bairro */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-zinc-300 mb-2 block">
                Cidade
              </label>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="São Paulo"
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

            <div>
              <label className="text-sm text-zinc-300 mb-2 block">
                Bairro
              </label>

              <input
                type="text"
                name="neighborhood"
                value={form.neighborhood}
                onChange={handleChange}
                placeholder="Centro"
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  py-3
                  px-4
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500/20
                  focus:border-blue-500
                "
              />
            </div>
          </div>

          {/* Infos */}
          <div className="grid grid-cols-3 gap-4">

            <div>
              <label className="text-sm text-zinc-300 mb-2 block">
                Quartos
              </label>

              <div className="relative">
                <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

                <input
                  type="number"
                  name="bedrooms"
                  value={form.bedrooms}
                  onChange={handleChange}
                  placeholder="3"
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
                  "
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-300 mb-2 block">
                Banheiros
              </label>

              <div className="relative">
                <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

                <input
                  type="number"
                  name="bathrooms"
                  value={form.bathrooms}
                  onChange={handleChange}
                  placeholder="2"
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
                  "
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-zinc-300 mb-2 block">
                Garagem
              </label>

              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

                <input
                  type="number"
                  name="garages"
                  value={form.garages}
                  onChange={handleChange}
                  placeholder="2"
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
                  "
                />
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Valor
            </label>

            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="450000"
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
                "
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              URL da imagem
            </label>

            <div className="relative">
              <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
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
            Publicar imóvel
          </button>
        </form>
      </div>
    </div>
  );
}
