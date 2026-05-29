import { Badge } from "#components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { useMyNotifications } from "#hooks/use-notifications";
import { Bell, LoaderCircle } from "lucide-react";

function formatDate(value: string) {
  const date = new Date(value);

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export default function NotificationsPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { data: notifications = [], isLoading, isError } = useMyNotifications(true);
  const unreadCount = notifications.filter((notification) => !notification.readAt).length;

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <Badge variant={unreadCount > 0 ? "default" : "secondary"}>
          {unreadCount} não lida{unreadCount === 1 ? "" : "s"}
        </Badge>
      </div>

      <Card>
        <CardHeader className="border-b border-border/70">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bell className="h-5 w-5" />
            Feed de notificações
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          {isLoading && (
            <div className="flex items-center gap-2 rounded-xl border border-dashed border-border px-4 py-8 text-sm text-muted-foreground">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Carregando notificações...
            </div>
          )}

          {!isLoading && isError && (
            <div className="rounded-xl border border-dashed border-destructive/30 bg-destructive/5 px-4 py-8 text-sm text-muted-foreground">
              Não foi possível carregar suas notificações agora.
            </div>
          )}

          {!isLoading && !isError && notifications.length === 0 && (
            <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              Nenhuma notificação encontrada.
            </div>
          )}

          {!isLoading &&
            !isError &&
            notifications.map((notification) => (
              <article
                key={notification.id}
                className="rounded-2xl border border-border/70 bg-card px-4 py-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold">{notification.title}</h3>
                      {!notification.readAt && <Badge variant="default">Nova</Badge>}
                    </div>

                    <p className="text-sm leading-6 text-muted-foreground">{notification.message}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline">{notification.type.replaceAll("_", " ")}</Badge>
                    <span className="text-xs text-muted-foreground">{formatDate(notification.createdAt)}</span>
                  </div>
                </div>
              </article>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
