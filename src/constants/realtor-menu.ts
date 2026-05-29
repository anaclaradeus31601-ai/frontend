import {
  CalendarDays,
  Clipboard,
  Home,
  LayoutDashboardIcon,
  MessageCircleMore,
  Settings,
  UserCircle,
  type LucideIcon,
} from "lucide-react";

type MenuItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export const realtorMenuItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    href: "/realtor",
  },
  {
    label: "Meus Imóveis",
    icon: Home,
    href: "/realtor/properties",
  },
  {
    label: "Minhas Visitas",
    icon: CalendarDays,
    href: "/realtor/visits",
  },
  {
    label: "Contratos",
    icon: Clipboard,
    href: "/realtor/contracts",
  },
  {
    label: "Mensagens",
    icon: MessageCircleMore,
    href: "/realtor/chat",
  },
];

export const realtorBottomItems: MenuItem[] = [
  {
    label: "Meu Perfil",
    icon: UserCircle,
    href: "/realtor/profile",
  },
  {
    label: "Configurações",
    icon: Settings,
    href: "/realtor/settings",
  },
];
