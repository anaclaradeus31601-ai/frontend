import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { Button } from "#components/ui/button";
import { Separator } from "#components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { realtorBottomItems, realtorMenuItems } from "../../constants/realtor-menu";
import { cn } from "../../lib/utils";

export default function RealtorAside() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen border-r bg-background transition-all duration-300",
        menuOpen ? "w-64" : "w-20",
      )}
    >
      <div className="flex items-center justify-end p-4">
        <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex flex-col items-center px-4">
        <Avatar className={cn(menuOpen ? "h-16 w-16" : "h-10 w-10")}>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
      </div>

      <nav className="mt-4 flex flex-col gap-1 px-3">
        {realtorMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.href} to={item.href}>
              <Button variant="ghost" className={cn("w-full justify-start gap-3", !menuOpen && "justify-center")}>
                <Icon className="h-5 w-5 shrink-0" />
                {menuOpen && <span>{item.label}</span>}
              </Button>
            </NavLink>
          );
        })}

        <Separator className="my-4" />

        {realtorBottomItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.href} to={item.href}>
              <Button variant="ghost" className={cn("w-full justify-start gap-3", !menuOpen && "justify-center")}>
                <Icon className="h-5 w-5 shrink-0" />
                {menuOpen && <span>{item.label}</span>}
              </Button>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
