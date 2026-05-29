import { Check, CheckCheck } from "lucide-react";

import { cn } from "../../lib/utils";
import type { ChatMessage } from "../../types/database";

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function MessageBubble({
  message,
  isOwn,
}: {
  message: ChatMessage;
  isOwn: boolean;
}) {
  return (
    <div className={cn("flex", isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-[1.6rem] px-4 py-3 text-sm shadow-sm sm:max-w-[72%]",
          isOwn
            ? "rounded-br-md bg-blue-600 text-white"
            : "rounded-bl-md border border-border/60 bg-background text-foreground",
        )}
      >
        <p className="whitespace-pre-wrap break-words leading-6">{message.content}</p>
        <div
          className={cn(
            "mt-2 flex items-center justify-end gap-1 text-[11px]",
            isOwn ? "text-blue-100" : "text-muted-foreground",
          )}
        >
          <span>{formatTimestamp(message.createdAt)}</span>
          {isOwn ? (
            message.isRead ? <CheckCheck className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
