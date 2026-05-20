import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <div className="flex flex-col justify-center items-center mt-4 bg-(--code-bg)">

        <div className="w-full flex mb-4 md:flex-row lg:flex-row flex-col gap-4 justify-around items-center">
            <div className="w-3/7 flex flex-col items-center ml-4">
                <div className="flex items-center ml-4">
                    <h1 className="text-2xl font-bold">estate</h1>
                    <p className="text-2xl text-(--accent) font-medium">flow</p>
                </div>
                {/* descrição */}
                <p className="text-(--text) hidden md:flex lg:flex text-sm">A EstateFlow é a plataforma definitiva para quem busca comprar, vender ou alugar imóveis. Com uma interface intuitiva e recursos avançados de busca, oferecemos uma experiência única para nossos usuários. Encontre o imóvel dos seus sonhos com facilidade e segurança na EstateFlow.</p>
            </div>
            <div className="w-4/7 md:w-2/7 lg:w-2/7 flex flex-row gap-6 justify-center items-center">
                <div className="flex flex-col items-center">
                    <h2 className="text-(text-h)" >Navegação</h2>
                    <ul className="flex flex-col items-center">
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/properties">Imóveis</Link></li>
                        <li><Link to="/about">Sobre nós</Link></li>
                        <li><Link to="/services">Serviços</Link></li>
                        <li><Link to="/contact">Contato</Link></li>
                    </ul>
                </div>
                <div className="flex flex-col items-center">
                   <h2 className="text-(text-h)" >Redes Sociais</h2>
                    <ul className="flex flex-col items-center">
                        <li><a href="https://www.facebook.com/estateflow" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://www.twitter.com/estateflow" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                        <li><a href="https://www.instagram.com/estateflow" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://www.linkedin.com/company/estateflow" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        <li><a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                    </ul> 
                </div>
                
            </div>
        </div>
        <p className="text-(--text) mt-4">© 2024 EstateFlow. Todos os direitos reservados.</p>
    </div>
  );
}