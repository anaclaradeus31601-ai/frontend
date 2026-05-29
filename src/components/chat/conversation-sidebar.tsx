import { Input } from "#components/ui/input";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import type { ChatConversation, UserPublicData } from "../../types/database";
import ConversationListItem from "./conversation-list-item";

function getUnreadCount(conversation: ChatConversation, currentUserId?: string) {
  return (conversation.messages ?? []).filter(
    (message) => !message.isRead && message.senderId !== currentUserId,
  ).length;
}

interface ConversationSidebarProps {
  conversations: ChatConversation[];
  activeConversationId?: string;
  currentUserId?: string;
  getCounterpart: (conversation: ChatConversation) => UserPublicData;
  onSelectConversation: (conversationId: string) => void;
  title?: string;
}

export default function ConversationSidebar({
  conversations,
  activeConversationId,
  currentUserId,
  getCounterpart,
  onSelectConversation,
  title = "Conversas",
}: ConversationSidebarProps) {
  const [search, setSearch] = useState("");

  const filteredConversations = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return conversations;
    }

    return conversations.filter((conversation) => {
      const counterpart = getCounterpart(conversation);

      return [
        counterpart.name,
        counterpart.email,
        conversation.property?.title ?? "",
        conversation.lastMessagePreview ?? "",
      ].some((value) => value.toLowerCase().includes(term));
    });
  }, [conversations, getCounterpart, search]);

  return (
    <aside className="flex h-full min-h-[32rem] flex-col rounded-[2rem] border border-border/60 bg-card/90 shadow-sm">
      <div className="border-b border-border/60 px-4 py-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Acompanhe suas conversas ativas em tempo real.</p>
        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar conversa"
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {filteredConversations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground">
            Nenhuma conversa encontrada.
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            const counterpart = getCounterpart(conversation);

            return (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                counterpart={counterpart}
                unreadCount={getUnreadCount(conversation, currentUserId)}
                isActive={conversation.id === activeConversationId}
                onClick={() => onSelectConversation(conversation.id)}
              />
            );
          })
        )}
      </div>
    </aside>
  );
}
