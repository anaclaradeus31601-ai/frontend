import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { cn } from "../../lib/utils";
import type { ChatConversation, UserPublicData } from "../../types/database";
import UnreadBadge from "./unread-badge";

function formatTime(value?: string | null) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

interface ConversationListItemProps {
  conversation: ChatConversation;
  counterpart: UserPublicData;
  unreadCount: number;
  isActive: boolean;
  onClick: () => void;
}

export default function ConversationListItem({
  conversation,
  counterpart,
  unreadCount,
  isActive,
  onClick,
}: ConversationListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-3xl border px-4 py-3 text-left transition-all duration-200",
        isActive
          ? "border-blue-300 bg-blue-50/80 shadow-sm ring-1 ring-blue-200 dark:border-blue-500/30 dark:bg-blue-500/10 dark:ring-blue-500/20"
          : "border-border/60 bg-background hover:bg-muted/50",
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-11 w-11 shrink-0">
          <AvatarImage src={counterpart.avatar ?? undefined} />
          <AvatarFallback>{counterpart.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{counterpart.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {conversation.property?.title ?? "Conversa direta"}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="text-[11px] text-muted-foreground">{formatTime(conversation.lastMessageAt)}</span>
              <UnreadBadge count={unreadCount} />
            </div>
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {conversation.lastMessagePreview ?? "Sem mensagens ainda."}
          </p>
        </div>
      </div>
    </button>
  );
}
