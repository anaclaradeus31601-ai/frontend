import { Lightbulb, LightbulbOffIcon, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "#components/ui/button";
// import Pesquisa from "./Pesquisa";

export default function Header() {

    const linkActive = "text-text-primary font-medium text-h hover:text-primary/80 transition-colors duration-300";
    const linkInactive = "text-text-h hover:text-text-primary transition-colors duration-300";
    const [menuOpen, setMenuOpen] = useState(false);

    const setMenu = () => {
        setMenuOpen(!menuOpen);
    }

    //pegar a preferencia do usuário

    // const [preferencia, setPreferencia] = useState("light");
    // const handleToggle = () => {
    //     setPreferencia(preferencia === "light" ? "dark" : "light");
    // };

    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {

        const handleScroll = () => {
            console.log(window.scrollY);
            setScrolled(window.scrollY > 94);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);


    const navigate = useNavigate();
    const isLoggedIn = false; //mudar ao fazer login

  return (    
    <div className={` w-full p-4 h-16 z-50 fixed flex items-center justify-center ${scrolled ? "bg-background/70 backdrop-blur-md shadow-md " : "bg-transparent"} `}>
        <div className="w-full flex h-16 justify-between gap-12 items-center">
            <div className="flex items-center ml-4 w-34.5">
                <h1 className="text-2xl font-bold">estate</h1>
                <p className="text-2xl text-text-primary font-medium">flow</p>
            </div>
            <div className="gap-4 ml:auto mr:auto hidden md:flex justify-evenly lg:flex items-center">
                {/* <Pesquisa/> */}
                <Link to="/" className={`${linkActive} text-h`}>Início</Link>
                <Link to="/properties" className={`${linkInactive} text-h`}>Imóveis</Link>
                <Link to="/about" className={`${linkInactive} text-h text-nowrap`}>Sobre nós</Link>
                <Link to="/services" className={`${linkInactive} text-h`}>Serviços</Link>
                <Link to="/contact" className={`${linkInactive} text-h`}>Contato</Link>
                {/* <Button onClick={() => handleToggle()}>{preferencia === "light" ? <Lightbulb/> : <LightbulbOffIcon/>}</Button> */}
            </div>
            {/* mudar ao fazer login */}
            {(isLoggedIn) ? (
                <div className="flex mr-8 items-center">
                    {/* <div className="hidden md:flex lg:flex gap-4 mr-4">
                        <div className=" flex items-center gap-2">
                            <h3 className="text-h ml-4">Ola, Joao</h3>
                            <img className="h-12 rounded-full mr-4 " src="https://api.dicebear.com/9.x/adventurer/svg?seed=Felix" alt="" />
                        </div>
                    </div> */}
                    <div className="flex gap-2 mr-4">
                        <button onClick={setMenu} ><Menu/></button>
                        {menuOpen && (
                            <div className="absolute top-16 right-6 bg-card shadow-2xl rounded-md p-4 flex flex-col gap-2">
                                <Link to="/profile" className={`${linkInactive} text-h hover:bg-text-primary-bg) active:bg-text-primary-bg) px-4 py-2 rounded`}>Perfil</Link>
                                <Link to="/my-properties" className={`${linkInactive} text-h hover:bg-text-primary-bg) active:bg-text-primary-bg) px-4 py-2 rounded`}>Meus imóveis</Link>
                                <Link to="/owner" className={`${linkInactive} btext-primary text-h hover:bg-text-primary-bg) active:bg-text-primary-bg) px-4 py-2 rounded`}>Anunciar imóvel</Link>
                                <button onClick={() => { navigate("/login") }} className={`${linkInactive} text-red-400 px-4 py-2 rounded hover:bg-text-primary-bg) active:bg-text-primary-bg)`}>Sair</button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
            <div className="flex gap-2 mr-4">
                <Button className="border bg-transparent text-foreground hover:bg-transparent border-foreground">Login</Button>
                <Button className="bg-text-primary text-white border-text-primary">Anunicar imóvel</Button>
            </div>
            )}
        </div>
    </div>
  );
}