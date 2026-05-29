import { Avatar, AvatarFallback, AvatarImage } from "#components/ui/avatar";
import { Badge } from "#components/ui/badge";
import { Button } from "#components/ui/button";
import { ArrowLeft, Building2 } from "lucide-react";

import type { ChatConversation, UserPublicData } from "../../types/database";

export default function ChatHeader({
  conversation,
  counterpart,
  onBack,
  showBackButton = false,
}: {
  conversation: ChatConversation;
  counterpart: UserPublicData;
  onBack?: () => void;
  showBackButton?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border/60 bg-background/90 px-4 py-4">
      {showBackButton ? (
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      ) : null}

      <Avatar className="h-11 w-11">
        <AvatarImage src={counterpart.avatar ?? undefined} />
        <AvatarFallback>{counterpart.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{counterpart.name}</p>
        <p className="truncate text-xs text-muted-foreground">{counterpart.email}</p>
      </div>

      {conversation.property?.title ? (
        <Badge variant="outline" className="hidden items-center gap-1 sm:inline-flex">
          <Building2 className="h-3 w-3" />
          {conversation.property.title}
        </Badge>
      ) : null}
    </div>
  );
}
