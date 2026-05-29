import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#components/ui/card";
import { cn } from "../../lib/utils";
import type { Visit } from "../../types/database";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";
import { useMemo, useState } from "react";

interface VisitCalendarProps {
  visits: Visit[];
  title?: string;
  emptyMessage?: string;
  renderMeta?: (visit: Visit) => string;
  renderActions?: (visit: Visit) => React.ReactNode;
}

interface NormalizedVisit extends Visit {
  scheduledDate: Date;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfWeek(date: Date) {
  const next = new Date(date);
  next.setDate(date.getDate() - date.getDay());
  next.setHours(0, 0, 0, 0);
  return next;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function sameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatFullDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(date);
}

function formatDayHeader(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
  }).format(date);
}

function formatTime(dateValue: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function formatStatus(status: string) {
  const map: Record<string, string> = {
    SCHEDULED: "Agendada",
    COMPLETED: "Concluída",
    CANCELLED: "Cancelada",
    NO_SHOW: "Não compareceu",
  };

  return map[status] ?? status;
}

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (status === "COMPLETED") return "secondary";
  if (status === "CANCELLED" || status === "NO_SHOW") return "destructive";
  return "default";
}

function buildCalendarDays(monthDate: Date) {
  const monthStart = startOfMonth(monthDate);
  const gridStart = startOfWeek(monthStart);

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(gridStart);
    day.setDate(gridStart.getDate() + index);
    return day;
  });
}
// pagina do calendario




export function VisitCalendar({
  visits,
  title = "Agenda de visitas",
  emptyMessage = "Nenhuma visita nesta semana.",
  renderMeta,
  renderActions,
}: VisitCalendarProps) {
  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const normalizedVisits = useMemo<NormalizedVisit[]>(() => {
    return visits
      .map((visit) => ({
        ...visit,
        scheduledDate: new Date(visit.scheduledAt),
      }))
      .filter((visit) => !Number.isNaN(visit.scheduledDate.getTime()));
  }, [visits]);

  const weekStart = useMemo(() => startOfWeek(selectedDate), [selectedDate]);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + index);
      return date;
    });
  }, [weekStart]);

  const calendarDays = useMemo(
    () => buildCalendarDays(startOfMonth(selectedDate)),
    [selectedDate],
  );

  const visitsByDate = useMemo(() => {
    const map = new Map<string, NormalizedVisit[]>();

    normalizedVisits.forEach((visit) => {
      const key = visit.scheduledDate.toISOString().slice(0, 10);
      const current = map.get(key) ?? [];
      current.push(visit);
      map.set(key, current);
    });

    map.forEach((dayVisits) =>
      dayVisits.sort(
        (a, b) =>
          new Date(a.scheduledAt).getTime() -
          new Date(b.scheduledAt).getTime(),
      ),
    );

    return map;
  }, [normalizedVisits]);

  const weekVisits = weekDays.flatMap((day) => {
    const key = day.toISOString().slice(0, 10);
    return visitsByDate.get(key) ?? [];
  });

  const hours = Array.from({ length: 10 }, (_, index) => index + 8);

  return (
    <div className="grid  gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
      {/* Sidebar */}
      <aside className="space-y-5">
        <Card className="rounded-[2rem]  bg-card shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold capitalize">
              {formatMonthLabel(selectedDate)}
            </CardTitle>

            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() - 1,
                      selectedDate.getDate(),
                    ),
                  )
                }
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setSelectedDate(
                    new Date(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth() + 1,
                      selectedDate.getDate(),
                    ),
                  )
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-muted-foreground">
              {["D", "S", "T", "Q", "Q", "S", "S"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-7 gap-2">
              {calendarDays.map((day) => {
                const key = day.toISOString().slice(0, 10);
                const isSelected = sameDay(day, selectedDate);
                const hasVisits = visitsByDate.has(key);

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-full text-sm transition",
                      "hover:bg-muted",
                      isSelected && "bg-primary text-primary-foreground",
                      !sameMonth(day, selectedDate) &&
                        "text-muted-foreground/50",
                    )}
                  >
                    <span className="relative">
                      {day.getDate()}

                      {hasVisits && !isSelected && (
                        <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border/60 bg-primary text-primary-foreground shadow-sm">
          <CardContent className="space-y-3 p-5">
            <p className="text-sm opacity-80">Resumo da semana</p>

            <h3 className="text-xl font-semibold">
              {weekVisits.length} visita(s)
            </h3>

            <p className="text-sm opacity-80">
              {weekVisits.length === 0
                ? emptyMessage
                : "Acompanhe as visitas agendadas no planner semanal."}
            </p>

            <Button
              variant="secondary"
              className="rounded-full"
              onClick={() => setSelectedDate(today)}
            >
              Ver hoje
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-border/60 bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Filtros</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked />
              Agendadas
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Concluídas
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Canceladas
            </label>
          </CardContent>
        </Card>
      </aside>

      {/* Planner semanal */}
      <Card className="overflow-hidden rounded-[2rem] border-border/60 bg-card shadow-sm">
        <CardHeader className="border-b border-border/60">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle className="text-xl capitalize">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Semana de {formatFullDate(weekStart)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const date = new Date(selectedDate);
                  date.setDate(selectedDate.getDate() - 7);
                  setSelectedDate(date);
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={() => setSelectedDate(today)}>
                Hoje
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const date = new Date(selectedDate);
                  date.setDate(selectedDate.getDate() + 7);
                  setSelectedDate(date);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button className="rounded-full">Criar visita</Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="overflow-x-auto p-0">
          <div className="min-w-[900px]">
            {/* Header dos dias */}
            <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-border/60">
              <div className="p-4 text-xs text-muted-foreground">GMT-03</div>

              {weekDays.map((day) => {
                const isToday = sameDay(day, today);

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "p-4 text-center transition hover:bg-muted/50",
                      isToday && "bg-accent text-accent-foreground",
                    )}
                  >
                    <p className="text-xs capitalize text-muted-foreground">
                      {formatDayHeader(day)}
                    </p>
                    <p className="text-3xl font-semibold">{day.getDate()}</p>
                  </button>
                );
              })}
            </div>

            {/* Corpo */}
            <div className="grid grid-cols-[80px_repeat(7,1fr)]">
              {hours.map((hour) => (
                <div key={hour} className="contents">
                  <div className="border-b border-border/60 p-3 text-xs text-muted-foreground">
                    {String(hour).padStart(2, "0")}:00
                  </div>

                  {weekDays.map((day) => {
                    const key = day.toISOString().slice(0, 10);

                    const dayVisits = visitsByDate.get(key) ?? [];

                    const visitsInHour = dayVisits.filter((visit) => {
                      const visitHour = new Date(
                        visit.scheduledAt,
                      ).getHours();

                      return visitHour === hour;
                    });

                    return (
                      <div
                        key={`${key}-${hour}`}
                        className="min-h-28 border-b border-l border-border/60 p-2"
                      >
                        <div className="space-y-2">
                          {visitsInHour.map((visit) => (
                            <article
                              key={visit.id}
                              className={cn(
                                "rounded-2xl border border-border/60 bg-muted/60 p-3 shadow-sm",
                                "hover:bg-muted transition",
                              )}
                            >
                              <h4 className="line-clamp-2 text-sm font-semibold">
                                {visit.property?.title ?? "Imóvel não informado"}
                              </h4>

                              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock3 className="h-3.5 w-3.5" />
                                {formatTime(visit.scheduledAt)}
                              </p>

                              {renderMeta && (
                                <p className="mt-2 text-xs text-muted-foreground">
                                  {renderMeta(visit)}
                                </p>
                              )}

                              <Badge
                                variant={getStatusVariant(visit.status)}
                                className="mt-3"
                              >
                                {formatStatus(visit.status)}
                              </Badge>

                              {renderActions && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {renderActions(visit)}
                                </div>
                              )}
                            </article>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
