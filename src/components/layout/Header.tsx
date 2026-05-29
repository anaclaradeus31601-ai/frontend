import { Heart, Menu, MessageCircleMore, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "#components/ui/button";
import { useAuth } from "../../contexts/auth-context";
import NotificationDropdown from "./NotificationDropdown";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 94);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-text-primary font-medium hover:text-primary/80 transition-colors duration-300"
      : "text-text-h hover:text-text-primary transition-colors duration-300";

  const menuLinkClass =
    "text-text-h hover:text-text-primary hover:bg-text-primary-bg active:bg-text-primary-bg px-4 py-2 rounded transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-center px-4 transition-all duration-300 ${
        scrolled ? "bg-background/70 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex h-full w-full items-center justify-between gap-4">
        {/* Logo */}
        <NavLink to="/" className="mr-auto flex w-34.5 items-center">
          <h1 className="text-2xl font-bold">estate</h1>
          <p className="text-2xl font-medium text-text-primary">flow</p>
        </NavLink>

        {/* Links desktop */}
        <nav className="mx-auto hidden items-center justify-evenly gap-4 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Início
          </NavLink>

          <NavLink to="/properties" className={navLinkClass}>
            Imóveis
          </NavLink>

          <NavLink to="/about" className={`${navLinkClass} text-nowrap`}>
            Sobre nós
          </NavLink>

          <NavLink to="/services" className={navLinkClass}>
            Serviços
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contato
          </NavLink>
        </nav>

        {isAuthenticated ? (
          <div className="relative flex items-center">
            <NotificationDropdown buttonClassName="mr-2 rounded-md p-2 hover:bg-muted" iconClassName="h-5 w-5" />

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="mr-4 rounded-md p-2 hover:bg-muted"
              aria-label="Abrir menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            {menuOpen && (
              <div className="absolute right-4 top-14 z-50 flex min-w-48 flex-col gap-2 rounded-md bg-card p-4 shadow-2xl">
                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className={menuLinkClass}
                >
                  Perfil
                </NavLink>

                <NavLink
                  to="/chat"
                  onClick={() => setMenuOpen(false)}
                  className={`${menuLinkClass} flex items-center gap-2`}
                >
                  <MessageCircleMore className="h-4 w-4" />
                  Mensagens
                </NavLink>

                <NavLink
                  to="/favoritos"
                  onClick={() => setMenuOpen(false)}
                  className={`${menuLinkClass} flex items-center gap-2`}
                >
                  <Heart className="h-4 w-4" />
                  Favoritos
                </NavLink>

                <NavLink
                  to="/my-properties"
                  onClick={() => setMenuOpen(false)}
                  className={menuLinkClass}
                >
                  Meus imóveis
                </NavLink>

                <NavLink
                  to="/owner"
                  onClick={() => setMenuOpen(false)}
                  className={menuLinkClass}
                >
                  Anunciar imóvel
                </NavLink>

                <button
                  type="button"
                  onClick={async () => {
                    setMenuOpen(false);
                    await logout();
                    navigate("/login");
                  }}
                  className="rounded px-4 py-2 text-left text-red-400 transition-colors hover:bg-text-primary-bg active:bg-text-primary-bg"
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="border-foreground bg-transparent text-foreground hover:bg-transparent"
            >
              Login
            </Button>

            <Button
              onClick={() => navigate("/owner")}
              className="border-text-primary bg-text-primary text-white"
            >
              Anunciar imóvel
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
