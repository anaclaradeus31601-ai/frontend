import { useState } from "react";
import casas from "../casas.json";
import { Link } from "react-router-dom";

export default function Pesquisa() {
  const [pesquisa, setPesquisa] = useState("");




    const resultados = casas.filter((casa) =>
        casa.title.toLowerCase().includes(pesquisa.toLowerCase())
    );

    const casasFiltradas = resultados.slice(0, 5);
    const temMaisResultados = resultados.length > 5;


  return (
    <div className="w-full hidden md:hidden sm:hidden xl:block lg:hidden p-4 max-w-2xl mx-auto relative">
      
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="
            w-full
            h-9
            border-2
            border-(--accent)
            bg-(--accent-bg)
            p-2
            rounded-md
            text-(--text-h)
            placeholder:text-gray-400
            focus:outline-none
            transition
          "
          value={pesquisa}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPesquisa(e.target.value)
          }
          type="text"
          placeholder="Pesquisar imóveis..."
        />
      </form>

      {pesquisa.trim() !== "" && (
        <div
          className="
            absolute
            top-16
            left-0
            w-135
            flex
            p-4
            rounded-md
            flex-col
            gap-2
            bg-(--accent-bg)
            z-50
          "
        >
          {casasFiltradas.length > 0 ? (
            casasFiltradas.map((casa) => (
              <Link
                key={casa.id}
                to={`/properties/${casa.id}`}
                className="
                  w-full
                  bg-(--accent-bg)
                  border
                  border-(--accent)
                  rounded-md
                  p-4
                  hover:bg-(--accent)
                  transition
                "
              >
                <h3 className="text-(--text-h) font-medium">
                  {casa.title}
                </h3>
              </Link>
            ))
          ) : (
            <div
              className="
                w-full
                bg-(--accent-bg)
                border
                border-(--accent)
                rounded-md
                p-4
                text-(--text-h)
              "
            >
              Nenhum imóvel encontrado.
            </div>
          )}
          {temMaisResultados && (
        <div
            className="
            p-3
            text-sm
            text-center
            text-gray-400
            "
        >
            <Link to={'/properties'}>Mais {resultados.length - 5} resultados... <span className="text-(--accent)">Ver todos</span></Link>
        </div>
        )}
        </div>
      )}
      
    </div>
  );
}