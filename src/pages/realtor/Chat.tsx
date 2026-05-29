import { useParams } from "react-router-dom";

import ChatShell from "../../components/chat/chat-shell";

export default function RealtorChat() {
  const { conversationId } = useParams();

  return (
    <ChatShell
      activeConversationId={conversationId}
      basePath="/realtor/chat"
      variant="realtor"
      title="Mensagens"
      description="Gerencie o atendimento com seus clientes em um espaço dedicado, com histórico e respostas em tempo real."
    />
  );
}
