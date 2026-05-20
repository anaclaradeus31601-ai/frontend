import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import Pesquisa from "./Pesquisa";

export default function Header() {

    const linkActive = "text-(--accent)";
    const linkInactive = "text-(--text-button)";
    const [menuOpen, setMenuOpen] = useState(false);

    const setMenu = () => {
        setMenuOpen(!menuOpen);
    }

    //pegar a preferencia do usuário

    const navigate = useNavigate();
    const isLoggedIn = true; //mudar ao fazer login

  return (    
    <div className="absolute w-full h-16 z-50 ">
        <div className="flex h-16 justify-around gap-12 items-center">
            <div className="flex items-center ml-4 w-34.5">
                <h1 className="text-2xl font-bold">estate</h1>
                <p className="text-2xl text-accent font-medium">flow</p>
            </div>
            <div className="gap-4 hidden md:flex justify-evenly lg:flex items-center">
                {/* <Pesquisa/> */}

                <Link to="/" className={`${linkActive} text-(--text-h)`}>Início</Link>
                <Link to="/properties" className={`${linkInactive} text-(--text-h)`}>Imóveis</Link>
                <Link to="/about" className={`${linkInactive} text-(--text-h) text-nowrap`}>Sobre nós</Link>
                <Link to="/services" className={`${linkInactive} text-(--text-h)`}>Serviços</Link>
                <Link to="/contact" className={`${linkInactive} text-(--text-h)`}>Contato</Link>
            </div>
            {/* mudar ao fazer login */}
            {(isLoggedIn) ? (
                <div className=" flex items-center">
                    {/* <div className="hidden md:flex lg:flex gap-4 mr-4">
                        <div className=" flex items-center gap-2">
                            <h3 className="text-(--text-h) ml-4">Ola, Joao</h3>
                            <img className="h-12 rounded-full mr-4 " src="https://api.dicebear.com/9.x/adventurer/svg?seed=Felix" alt="" />
                        </div>
                    </div> */}
                    <div className="flex gap-2 mr-4">
                        <button onClick={setMenu} ><Menu/></button>
                        {menuOpen && (
                            <div className="absolute top-16 right-4 bg-(--code-bg) shadow-2xl rounded-md p-4 flex flex-col gap-2">
                                <Link to="/profile" className={`${linkInactive} text-(--text-h) hover:bg-(--accent-bg) active:bg-(--accent-bg) px-4 py-2 rounded`}>Perfil</Link>
                                <Link to="/my-properties" className={`${linkInactive} text-(--text-h) hover:bg-(--accent-bg) active:bg-(--accent-bg) px-4 py-2 rounded`}>Meus imóveis</Link>
                                <Link to="/owner" className={`${linkInactive} bg--accent text-(--text-h) hover:bg-(--accent-bg) active:bg-(--accent-bg) px-4 py-2 rounded`}>Anunciar imóvel</Link>
                                <button onClick={() => { navigate("/login") }} className={`${linkInactive} text-red-400 px-4 py-2 rounded hover:bg-(--accent-bg) active:bg-(--accent-bg)`}>Sair</button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
            <div className="flex gap-2 mr-4">
                <Link to="/login" className="bg-transparent h-8 w-20  flex items-center justify-center border-(--accent text-accent  border-2   rounded">Login</Link>
                <Link to="/owner" className={`${linkInactive} w-34 flex items-center justify-center bg-accent text-(--text-h) rounded`}>Anunciar imóvel</Link>
            </div>
            )}
        </div>
    </div>
  );
}