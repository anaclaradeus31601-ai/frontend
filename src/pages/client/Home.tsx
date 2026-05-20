import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import fundo from "../../../public/imagens/casafundodia.png"
import { MapPinIcon } from "lucide-react";

export default function Home() {



  return (
    <div className="relative w-screen">
      <Header />
      <main className="w-full h-screen">
        <img className="w-full h-110 object-cover dark:brightness-50" src={fundo} alt="" />
        <div className="flex gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-15  rounded-2xl bg-(--bg)">
          <div>
            <h4 className="text-sm font-bold ">O que você procura?</h4>
            <input className="border border-gray-200 text-sm h-8  rounded-md outline-none focus:border-2 focus:border-(--accent)" type="text" placeholder="Ex: Apartamento, Casa, Terreno..." />
          </div>
          <div>
            <h4 className="text-sm font-bold">Tipo de imóvel</h4>
            <select className="border border-gray-200 text-sm px-3 h-8 rounded-md outline-none active:border-2 active:border-(--accent)">
              <option value="todos">Todos</option>
            </select>
          </div>
          <div>
            <h4 className="text-sm font-bold">Localização</h4>
            <div className="flex border border-gray-200 items-center h-8  text-sm rounded-md outline-none focus:border-2 focus:border-(--accent)">
              <label className="ml-3" htmlFor="loc"><MapPinIcon size={18} /></label>
              <input name="loc" id="loc" className=" h-8 outline-none ml-2" type="text" placeholder="Cidade, bairro ou região" />
            </div>
          </div>
          <div>
            <h4>Preço</h4>

            <select>
              <option value="all">Todos</option>

              <option value="0-100000">
                Até R$ 100 mil
              </option>

              <option value="100000-300000">
                R$ 100 mil - R$ 300 mil
              </option>

              <option value="300000-500000">
                R$ 300 mil - R$ 500 mil
              </option>

              <option value="500000-1000000">
                R$ 500 mil - R$ 1 milhão
              </option>

              <option value="1000000-999999999">
                Acima de R$ 1 milhão
              </option>
            </select>
          </div>
          <div></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}