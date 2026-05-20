import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "#components/ui/dropdown-menu";
import {
    Bell,
    ChevronDown,
    LogOut,
    Search,
    Settings,
    User,
} from "lucide-react";
import { Link } from "react-router-dom";


const button = "h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors";

export default function TopAdmin() {
    const formattedDate = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    return (
        <div className="flex top-0 w-full items-center justify-between p-4 border-b bg-background">
            {/* Left */}
            <div className="flex items-center gap-4">
                <label
                    className="h-12 bg-muted rounded-full px-4 flex items-center gap-2"
                    htmlFor="search"
                >
                    <Search className="h-5 w-5 text-muted-foreground" />

                    <input
                        className="bg-transparent outline-none placeholder:text-muted-foreground"
                        placeholder="Pesquisar..."
                        id="search"
                        type="text"
                    />
                </label>

                <div className="text-sm text-muted-foreground capitalize">
                    {formattedDate}
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                <Link to="/settings" className={button}>
                    <Settings className="h-5 w-5" />
                </Link>

                <Link to="/notifications" className={button}>
                    <Bell className="h-5 w-5" />
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="
                flex items-center gap-2 rounded-full
                hover:bg-accent transition-colors p-1 pr-3
              "
                        >
                            {/* avatar */}
                            <Avatar className="w-10 h-10">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>

                            <div className="hidden md:flex flex-col items-start">
                                <span className="text-sm font-medium">
                                    John Doe
                                </span>

                                <span className="text-xs text-muted-foreground">
                                    Admin
                                </span>
                            </div>

                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="w-56"
                    >
                        <DropdownMenuLabel>
                            Minha Conta
                        </DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                            <Link to="/profile">
                                <User className="mr-2 h-4 w-4" />
                                Perfil
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link to="/settings">
                                <Settings className="mr-2 h-4 w-4" />
                                Configurações
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-red-500 focus:text-red-500">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
