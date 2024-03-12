import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AddMessage() {
  return (
    <div className="flex w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  );
}
