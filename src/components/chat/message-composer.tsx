import { Button } from "#components/ui/button";
import { Textarea } from "#components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function MessageComposer({
  disabled,
  onSend,
}: {
  disabled?: boolean;
  onSend: (content: string) => Promise<void> | void;
}) {
  const [content, setContent] = useState("");

  async function handleSubmit() {
    const trimmed = content.trim();

    if (!trimmed || disabled) {
      return;
    }

    await onSend(trimmed);
    setContent("");
  }

  return (
    <div className="border-t border-border/60 bg-background/90 p-4">
      <div className="flex items-end gap-3">
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          onKeyDown={async (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              await handleSubmit();
            }
          }}
          placeholder="Escreva sua mensagem..."
          className="min-h-12 resize-none rounded-2xl"
          disabled={disabled}
        />

        <Button onClick={() => void handleSubmit()} disabled={disabled || content.trim().length === 0} className="h-12 rounded-2xl px-4">
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
