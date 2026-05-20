import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "#components/ui/button";
import { Separator } from "#components/ui/separator";
import { cn } from "../../lib/utils";
import {Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { menuItems, bottomItems } from "../../constants/admin-menu";


export default function AdminHeader() {
  const [menuOpen, setMenuOpen] = useState(true);


  return (
    <aside
      className={cn(
        "h-screen border-r bg-background transition-all duration-300",
        menuOpen ? "w-64" : "w-20"
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

        {menuOpen && (
          <div className="mt-3 text-center">
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-muted-foreground">
              johndoe@gmail.com
            </p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-6 flex flex-col gap-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3",
                  !menuOpen && "justify-center"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />

                {menuOpen && <span>{item.label}</span>}
              </Button>
            </Link>
          );
        })}

        <Separator className="my-4" />

        {bottomItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3",
                  !menuOpen && "justify-center"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />

                {menuOpen && <span>{item.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}