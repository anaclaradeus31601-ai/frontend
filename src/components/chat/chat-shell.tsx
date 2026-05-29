import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/auth-context";
import { useChatConversations } from "../../hooks/use-chat-conversations";
import { useChatMessages } from "../../hooks/use-chat-messages";
import { useChatRealtime } from "../../hooks/use-chat-realtime";
import type { ChatConversation, UserPublicData } from "../../types/database";
import ChatWindow from "./chat-window";
import ConversationEmptyState from "./conversation-empty-state";
import ConversationSidebar from "./conversation-sidebar";

function getCounterpart(conversation: ChatConversation, currentUserId?: string) {
  return conversation.clientId === currentUserId ? conversation.realtor : conversation.client;
}

interface ChatShellProps {
  activeConversationId?: string;
  basePath: string;
  variant: "realtor" | "client";
  title: string;
  description: string;
}

export default function ChatShell({
  activeConversationId,
  basePath,
  variant,
  title,
  description,
}: ChatShellProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const { data: conversations = [], isLoading: conversationsLoading } = useChatConversations(isAuthenticated);
  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId),
    [activeConversationId, conversations],
  );
  const { data: messages = [], isLoading: messagesLoading } = useChatMessages(activeConversationId, Boolean(activeConversationId));

  useChatRealtime(activeConversationId, isAuthenticated);

  const counterpart = activeConversation ? getCounterpart(activeConversation, user?.id) : null;
  const showConversationOnMobile = variant === "client" && Boolean(activeConversationId);

  if (loading) {
    return <div className="px-6 py-12 text-center text-muted-foreground">Carregando chat...</div>;
  }

  if (!isAuthenticated || !user) {
    return <div className="px-6 py-12 text-center text-muted-foreground">Faça login para acessar suas conversas.</div>;
  }

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid min-h-[36rem] gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
        <div className={showConversationOnMobile ? "hidden lg:block" : "block"}>
          <ConversationSidebar
            conversations={conversations}
            activeConversationId={activeConversationId}
            currentUserId={user.id}
            getCounterpart={(conversation) => getCounterpart(conversation, user.id)}
            onSelectConversation={(conversationId) => navigate(`${basePath}/${conversationId}`)}
            title={variant === "realtor" ? "Conversas com clientes" : "Minhas conversas"}
          />
        </div>

        <div className={showConversationOnMobile ? "block" : "block"}>
          {conversationsLoading ? (
            <div className="flex h-full min-h-[32rem] items-center justify-center rounded-[2rem] border border-border/60 bg-card/60 text-sm text-muted-foreground">
              Carregando conversas...
            </div>
          ) : activeConversation && counterpart ? (
            <ChatWindow
              conversation={activeConversation}
              counterpart={counterpart as UserPublicData}
              messages={messages}
              currentUserId={user.id}
              isLoading={messagesLoading}
              showBackButton={variant === "client"}
              onBack={() => navigate(basePath)}
            />
          ) : (
            <ConversationEmptyState
              title={variant === "realtor" ? "Selecione uma conversa" : "Abra uma conversa"}
              description={
                variant === "realtor"
                  ? "Escolha um cliente na lateral para visualizar o histórico e responder em tempo real."
                  : "Escolha uma conversa para continuar seu atendimento com o corretor."
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
