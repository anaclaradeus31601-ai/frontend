import type { ChatMessage } from "../../types/database";
import MessageBubble from "./message-bubble";

export default function MessageList({
  messages,
  currentUserId,
}: {
  messages: ChatMessage[];
  currentUserId?: string;
}) {
  if (messages.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border/70 px-4 py-12 text-center text-sm text-muted-foreground">
        Ainda não há mensagens nesta conversa.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} isOwn={message.senderId === currentUserId} />
      ))}
    </div>
  );
}
