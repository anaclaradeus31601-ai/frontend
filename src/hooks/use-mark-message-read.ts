import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "../lib/api";
import { chatConversationsQueryKey } from "./use-chat-conversations";
import { getChatMessagesQueryKey } from "./use-chat-messages";

export function useMarkMessageRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      messageId,
      conversationId: _conversationId,
    }: {
      messageId: string;
      conversationId: string;
    }) =>
      apiRequest("/chat/messages/read", {
        method: "PATCH",
        body: JSON.stringify({ messageId }),
      }),
    onSuccess: async (_response, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: chatConversationsQueryKey }),
        queryClient.invalidateQueries({
          queryKey: getChatMessagesQueryKey(variables.conversationId),
        }),
      ]);
    },
  });
}
