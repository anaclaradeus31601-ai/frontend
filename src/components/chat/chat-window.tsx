import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

import { useMarkMessageRead } from "../../hooks/use-mark-message-read";
import { useSendMessage } from "../../hooks/use-send-message";
import type { ChatConversation, ChatMessage, UserPublicData } from "../../types/database";
import ChatHeader from "./chat-header";
import MessageComposer from "./message-composer";
import MessageList from "./message-list";

export default function ChatWindow({
  conversation,
  counterpart,
  messages,
  currentUserId,
  isLoading,
  onBack,
  showBackButton = false,
}: {
  conversation: ChatConversation;
  counterpart: UserPublicData;
  messages: ChatMessage[];
  currentUserId?: string;
  isLoading: boolean;
  onBack?: () => void;
  showBackButton?: boolean;
}) {
  const sendMessage = useSendMessage();
  const markMessageRead = useMarkMessageRead();

  useEffect(() => {
    const unreadMessages = messages.filter(
      (message) => !message.isRead && message.senderId !== currentUserId,
    );

    unreadMessages.forEach((message) => {
      markMessageRead.mutate({
        messageId: message.id,
        conversationId: conversation.id,
      });
    });
  }, [conversation.id, currentUserId, markMessageRead, messages]);

  return (
    <div className="flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-card/95 shadow-sm">
      <ChatHeader
        conversation={conversation}
        counterpart={counterpart}
        onBack={onBack}
        showBackButton={showBackButton}
      />

      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-muted/15 via-background to-background px-4 py-5">
        {isLoading ? (
          <div className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Carregando mensagens...
          </div>
        ) : (
          <MessageList messages={messages} currentUserId={currentUserId} />
        )}
      </div>

      <MessageComposer
        disabled={sendMessage.isPending}
        onSend={async (content) => {
          await sendMessage.mutateAsync({
            conversationId: conversation.id,
            content,
          });
        }}
      />
    </div>
  );
}
