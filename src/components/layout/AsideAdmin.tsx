import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "#components/ui/button";
import { Separator } from "#components/ui/separator";
import { cn } from "../../lib/utils";
import {Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { menuItems, bottomItems } from "../../constants/admin-menu";


export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 overflow-x-hidden border-r border-border/60 bg-background/95 backdrop-blur transition-all duration-300",
        menuOpen ? "w-64 scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600" : "w-20"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* User */}
      <div className="flex flex-col items-center px-4">
        <Avatar className={cn(menuOpen ? "w-16 h-16" : "w-10 h-10")}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex min-w-0 flex-col gap-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full min-w-0 justify-start gap-3 overflow-hidden rounded-xl px-3 text-slate-700 transition-colors hover:bg-muted/70 hover:text-foreground dark:text-slate-200 dark:hover:bg-muted/50",
                  !menuOpen && "justify-center"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />

                {menuOpen && <span className="truncate">{item.label}</span>}
              </Button>
            </NavLink>
          );
        })}

        <Separator className="my-4" />

        {bottomItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full min-w-0 justify-start gap-3 overflow-hidden rounded-xl px-3 text-slate-700 transition-colors hover:bg-muted/70 hover:text-foreground dark:text-slate-200 dark:hover:bg-muted/50",
                  !menuOpen && "justify-center"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />

                {menuOpen && <span className="truncate">{item.label}</span>}
              </Button>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
