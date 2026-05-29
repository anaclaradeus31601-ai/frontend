import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../lib/api";
import type { ChatMessage } from "../types/database";

export function getChatMessagesQueryKey(conversationId?: string) {
  return ["chat", "messages", conversationId] as const;
}

export function useChatMessages(conversationId?: string, enabled = true) {
  return useQuery({
    queryKey: getChatMessagesQueryKey(conversationId),
    queryFn: async () => {
      const messages = await apiRequest<ChatMessage[]>("/chat/messages", {}, {
        conversationId,
      });

      return [...messages].reverse();
    },
    enabled: Boolean(conversationId) && enabled,
    staleTime: 10_000,
  });
}
