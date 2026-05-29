import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { ChevronDown, LogOut, Search, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import NotificationDropdown from "./NotificationDropdown";

const actionButton = "h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors";

export default function TopRealtor() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const formattedDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="flex top-0 w-full items-center justify-between border-b bg-background p-4">
      <div className="flex items-center gap-4">
        <label className="flex h-12 items-center gap-2 rounded-full bg-muted px-4" htmlFor="realtor-search">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            className="bg-transparent outline-none placeholder:text-muted-foreground"
            placeholder="Pesquisar..."
            id="realtor-search"
            type="text"
          />
        </label>

        <div className="hidden text-sm capitalize text-muted-foreground md:block lg:block">{formattedDate}</div>
      </div>

      <div className="hidden items-center gap-2 md:flex lg:flex">
        <Link to="/realtor/settings" className={actionButton}>
          <Settings className="h-5 w-5" />
        </Link>

        <NotificationDropdown buttonClassName={actionButton} viewAllHref="/realtor/notifications" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full p-1 pr-3 transition-colors hover:bg-accent">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.avatar ?? "https://github.com/shadcn.png"} />
                <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() ?? "CR"}</AvatarFallback>
              </Avatar>

              <div className="hidden flex-col items-start md:flex">
                <span className="text-sm font-medium">{user?.name ?? "Corretor"}</span>
                <span className="text-xs text-muted-foreground">{user?.role ?? "REALTOR"}</span>
              </div>

              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/realtor/profile">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/realtor/settings">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={async () => {
                await logout();
                navigate("/login/corretor");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
