import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";

import { getSocketServerUrl } from "../lib/api";
import type { ChatConversation, ChatMessage } from "../types/database";
import { chatConversationsQueryKey } from "./use-chat-conversations";
import { getChatMessagesQueryKey } from "./use-chat-messages";

export function useChatRealtime(activeConversationId?: string, enabled = true) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const socketServerUrl = getSocketServerUrl();

    if (!socketServerUrl) {
      return;
    }

    const socket = io(socketServerUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      void queryClient.invalidateQueries({ queryKey: chatConversationsQueryKey });

      if (activeConversationId) {
        socket.emit("chat:join-conversation", { conversationId: activeConversationId });
      }
    });

    socket.on("chat:conversation-created", (conversation: ChatConversation) => {
      const current = queryClient.getQueryData<ChatConversation[]>(chatConversationsQueryKey) ?? [];
      const next = [conversation, ...current.filter((item) => item.id !== conversation.id)];
      queryClient.setQueryData(chatConversationsQueryKey, next);
    });

    socket.on("chat:conversation-updated", (conversation: ChatConversation) => {
      const current = queryClient.getQueryData<ChatConversation[]>(chatConversationsQueryKey) ?? [];
      const next = current.map((item) => (item.id === conversation.id ? conversation : item));
      queryClient.setQueryData(chatConversationsQueryKey, next);
    });

    socket.on("chat:message-created", (message: ChatMessage) => {
      void queryClient.invalidateQueries({ queryKey: chatConversationsQueryKey });

      queryClient.setQueryData<ChatMessage[]>(
        getChatMessagesQueryKey(message.conversationId),
        (currentMessages) => {
          if (!currentMessages) {
            return currentMessages;
          }

          const exists = currentMessages.some((currentMessage) => currentMessage.id === message.id);

          if (exists) {
            return currentMessages;
          }

          return [...currentMessages, message];
        },
      );
    });

    socket.on(
      "chat:message-read",
      (payload: { messageId: string; conversationId: string; readAt: string | null }) => {
        void queryClient.invalidateQueries({ queryKey: chatConversationsQueryKey });

        queryClient.setQueryData<ChatMessage[]>(
          getChatMessagesQueryKey(payload.conversationId),
          (currentMessages) =>
            currentMessages?.map((message) =>
              message.id === payload.messageId
                ? { ...message, isRead: true, readAt: payload.readAt }
                : message,
            ) ?? currentMessages,
        );
      },
    );

    return () => {
      if (activeConversationId) {
        socket.emit("chat:leave-conversation", { conversationId: activeConversationId });
      }

      socket.disconnect();
    };
  }, [activeConversationId, enabled, queryClient]);
}
