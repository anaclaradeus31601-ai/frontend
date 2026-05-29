import { Badge } from "#components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { ScrollArea } from "#components/ui/scroll-area";
import { useMyNotifications } from "#hooks/use-notifications";
import {
  Bell,
  CalendarX2,
  ChevronRight,
  CircleDollarSign,
  FileText,
  Home,
  LoaderCircle,
  ShieldAlert,
  UserRoundCog,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/auth-context";
import type { Notification } from "../../types/database";

const iconByType = {
  default: Bell,
  visit: CalendarX2,
  payment: CircleDollarSign,
  contract: FileText,
  property: Home,
  user: UserRoundCog,
  owner: ShieldAlert,
} as const;

function getNotificationIcon(type: string) {
  const normalizedType = type.toLowerCase();

  if (normalizedType.includes("visit")) return iconByType.visit;
  if (normalizedType.includes("payment")) return iconByType.payment;
  if (normalizedType.includes("contract")) return iconByType.contract;
  if (normalizedType.includes("property") || normalizedType.includes("price")) return iconByType.property;
  if (normalizedType.includes("user") || normalizedType.includes("account")) return iconByType.user;
  if (normalizedType.includes("owner") || normalizedType.includes("admin")) return iconByType.owner;

  return iconByType.default;
}

function formatNotificationDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function NotificationRow({ notification }: { notification: Notification }) {
  const Icon = getNotificationIcon(notification.type);

  return (
    <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-background px-3 py-3 transition-colors hover:bg-muted/50">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-foreground">{notification.title}</p>
          {!notification.readAt && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />}
        </div>

        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{notification.message}</p>

        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
            {notification.type.replaceAll("_", " ")}
          </span>
          <span className="text-[11px] text-muted-foreground">{formatNotificationDate(notification.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

interface NotificationDropdownProps {
  buttonClassName: string;
  iconClassName?: string;
  viewAllHref?: string;
}

export default function NotificationDropdown({
  buttonClassName,
  iconClassName = "h-5 w-5",
  viewAllHref,
}: NotificationDropdownProps) {
  const { isAuthenticated } = useAuth();
  const { data: notifications = [], isLoading, isError } = useMyNotifications(isAuthenticated);

  const unreadCount = notifications.filter((notification) => !notification.readAt).length;
  const recentNotifications = notifications.slice(0, 6);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className={`relative ${buttonClassName}`} aria-label="Abrir notificações">
          <Bell className={iconClassName} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-semibold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[22rem] p-0">
        <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3">
          <div className="space-y-1">
            <p className="text-sm font-semibold">Notificações</p>
            <p className="text-xs text-muted-foreground">Sinais recentes da sua operação</p>
          </div>

          <Badge variant={unreadCount > 0 ? "default" : "secondary"}>
            {unreadCount} não lida{unreadCount === 1 ? "" : "s"}
          </Badge>
        </div>

        <ScrollArea className="max-h-96">
          <div className="space-y-3 p-3">
            {isLoading && (
              <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Carregando notificações...
              </div>
            )}

            {!isLoading && isError && (
              <div className="rounded-xl border border-dashed border-destructive/30 bg-destructive/5 px-4 py-6 text-sm text-muted-foreground">
                Não foi possível carregar suas notificações agora.
              </div>
            )}

            {!isLoading && !isError && recentNotifications.length === 0 && (
              <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                Nenhuma notificação por enquanto.
              </div>
            )}

            {!isLoading && !isError && recentNotifications.map((notification) => (
              <NotificationRow key={notification.id} notification={notification} />
            ))}
          </div>
        </ScrollArea>

        {viewAllHref && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="m-1 rounded-md px-3 py-2.5">
              <Link to={viewAllHref} className="flex items-center justify-between">
                Abrir central de notificações
                <ChevronRight className="h-4 w-4" />
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
