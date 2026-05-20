import {
  BarChart3,
  Clipboard,
  Home,
  Settings,
  User,
  UserCircle,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

type MenuItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

type BottomItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export const menuItems : MenuItem[] = [
  {
    label: "Análises",
    icon: BarChart3,
    href: "/admin/analytics",
  },
  {
    label: "Imóveis",
    icon: Home,
    href: "/admin/properties",
  },
  {
    label: "Donos de Imóveis",
    icon: User,
    href: "/admin/owners",
  },
  {
    label: "Corretores",
    icon: Users,
    href: "/admin/realtors",
  },
  {
    label: "Contratos",
    icon: Clipboard,
    href: "/admin/contracts",
  },
  {
    label: "Pagamentos",
    icon: Wallet,
    href: "/admin/payments",
  },
];

export const bottomItems : BottomItem[] = [
  {
    label: "Clientes",
    icon: Users,
    href: "/admin/clients",
  },
  {
    label: "Meu Perfil",
    icon: UserCircle,
    href: "/",
  },
  {
    label: "Configurações",
    icon: Settings,
    href: "/admin/settings",
  },
];