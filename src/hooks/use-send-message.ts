import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "../lib/api";
import type { ChatMessage } from "../types/database";
import { chatConversationsQueryKey } from "./use-chat-conversations";
import { getChatMessagesQueryKey } from "./use-chat-messages";

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      conversationId,
      content,
    }: {
      conversationId: string;
      content: string;
    }) =>
      apiRequest<ChatMessage>("/chat/messages", {
        method: "POST",
        body: JSON.stringify({ conversationId, content }),
      }),
    onSuccess: async (_message, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: chatConversationsQueryKey }),
        queryClient.invalidateQueries({
          queryKey: getChatMessagesQueryKey(variables.conversationId),
        }),
      ]);
    },
  });
}
