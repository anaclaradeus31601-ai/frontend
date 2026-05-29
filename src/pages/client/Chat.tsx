import { useParams } from "react-router-dom";

import ChatShell from "../../components/chat/chat-shell";

export default function ClientChat() {
  const { conversationId } = useParams();

  return (
    <ChatShell
      activeConversationId={conversationId}
      basePath="/chat"
      variant="client"
      title="Mensagens"
      description="Converse com seu corretor em uma interface mais direta, no estilo de um mensageiro."
    />
  );
}
