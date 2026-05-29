import { MessageSquareMore } from "lucide-react";

export default function ConversationEmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex h-full min-h-[32rem] flex-col items-center justify-center rounded-[2rem] border border-dashed border-border/70 bg-card/50 px-6 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <MessageSquareMore className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}
