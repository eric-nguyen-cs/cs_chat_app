import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function AddMessage() {
  return (
    <div className="flex flex-col w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button className="self-end">Send message</Button>
    </div>
  );
}
