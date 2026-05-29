import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../lib/api";
import type { ChatConversation } from "../types/database";

export const chatConversationsQueryKey = ["chat", "conversations"] as const;

export function useChatConversations(enabled = true) {
  return useQuery({
    queryKey: chatConversationsQueryKey,
    queryFn: () => apiRequest<ChatConversation[]>("/chat/conversations"),
    enabled,
    staleTime: 20_000,
  });
}
