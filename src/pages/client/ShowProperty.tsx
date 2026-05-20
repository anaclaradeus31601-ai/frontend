import {
  BedDouble,
  Bath,
  Car,
  MapPin,
  Heart,
  Share2,
} from "lucide-react";

export default function ShowProperties() {
  const property = {
    title: "Casa moderna com piscina",
    city: "São Paulo",
    neighborhood: "Alphaville",
    price: "R$ 450.000",
    bedrooms: 4,
    bathrooms: 3,
    garages: 2,
    description:
      "Casa moderna de alto padrão com piscina, área gourmet e acabamento premium. Localizada em condomínio fechado.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop",
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Image */}
      <div className="w-full h-75 md:h-125 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left */}
          <div className="flex-1">

            {/* Title */}
            <div className="flex items-start justify-between gap-4">

              <div>
                <h1 className="text-3xl font-bold">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 mt-2 text-zinc-400">
                  <MapPin className="w-4 h-4" />

                  <p className="text-sm">
                    {property.neighborhood}, {property.city}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">

                <button
                  className="
                    p-2
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    hover:bg-white/10
                    transition
                  "
                >
                  <Heart className="w-4 h-4" />
                </button>

                <button
                  className="
                    p-2
                    rounded-xl
                    bg-white/5
                    border
                    border-white/10
                    hover:bg-white/10
                    transition
                  "
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Infos */}
            <div
              className="
                mt-6
                grid
                grid-cols-3
                gap-4
              "
            >

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                <BedDouble className="w-5 h-5 mb-2 text-zinc-300" />

                <span className="text-lg font-semibold">
                  {property.bedrooms}
                </span>

                <p className="text-xs text-zinc-400">
                  Quartos
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                <Bath className="w-5 h-5 mb-2 text-zinc-300" />

                <span className="text-lg font-semibold">
                  {property.bathrooms}
                </span>

                <p className="text-xs text-zinc-400">
                  Banheiros
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  p-4
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                <Car className="w-5 h-5 mb-2 text-zinc-300" />

                <span className="text-lg font-semibold">
                  {property.garages}
                </span>

                <p className="text-xs text-zinc-400">
                  Garagens
                </p>
              </div>
            </div>

            {/* Description */}
            <div
              className="
                mt-8
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
              "
            >
              <h2 className="text-xl font-semibold mb-4">
                Sobre o imóvel
              </h2>

              <p className="text-zinc-300 leading-relaxed text-sm">
                {property.description}
              </p>
            </div>
          </div>

          {/* Right Card */}
          <div className="w-full lg:w-87.5">

            <div
              className="
                sticky
                top-6
                rounded-2xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
              "
            >

              <p className="text-zinc-400 text-sm">
                Valor do imóvel
              </p>

              <h2 className="text-3xl font-bold mt-1">
                {property.price}
              </h2>

              <button
                className="
                  w-full
                  mt-6
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
                Entrar em contato
              </button>

              <button
                className="
                  w-full
                  mt-3
                  rounded-xl
                  border
                  border-white/10
                  bg-white/5
                  py-3
                  text-sm
                  font-medium
                  transition
                  hover:bg-white/10
                "
              >
                Agendar visita
              </button>

              {/* Realtor */}
              <div
                className="
                  mt-6
                  border-t
                  border-white/10
                  pt-6
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-full
                    bg-zinc-700
                  "
                />

                <div>
                  <h3 className="font-medium">
                    Ana Clara
                  </h3>

                  <p className="text-xs text-zinc-400">
                    Corretora responsável
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}