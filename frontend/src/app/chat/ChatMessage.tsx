import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/services/socket";
import { useAuthContext } from "@/services/auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: number;
  username: string;
  content: string;
  writtenAt: number;
}

function getFormattedDate(timestamp: number) {
  const date = new Date(timestamp);
  const options = {
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
  } as const;
  return date.toLocaleString("fr-FR", options);
}

interface DeleteMenuButtonProps {
  disabled?: boolean;
}

const DeleteMenuButton = ({ disabled = false }: DeleteMenuButtonProps) => {
  return (
    <>
      {disabled ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full cursor-not-allowed">
              <ContextMenuItem
                disabled={disabled}
                className="text-red-600 focus:text-red-600 font-medium"
              >
                <TrashIcon className="mr-2" />
                Delete
              </ContextMenuItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>This message can only be deleted by its author.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <ContextMenuItem className="text-red-600 focus:text-red-600 font-medium focus:cursor-pointer">
          <TrashIcon className="mr-2" />
          Delete
        </ContextMenuItem>
      )}
    </>
  );
};

export const ChatMessage = ({ message }: { message: Message }) => {
  const { socket } = useSocket();
  const { username } = useAuthContext();

  const deleteMessage = () => {
    if (!socket) {
      console.error("Socket not available");
      return;
    }
    socket.emit("deleteMessage", message.id);
  };

  const isDeletable = message.username === username;

  return (
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <p className="font-semibold leading-none tracking-tight text-gray-800 text-sm">
                {message.username}
              </p>
              <p className="text-gray-500 text-sm tracking-tight">
                {getFormattedDate(message.writtenAt)}
              </p>
            </CardHeader>
            <CardContent>
              <p>{message.content}</p>
            </CardContent>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {isDeletable ? (
            <DialogTrigger className="w-full">
              <DeleteMenuButton />
            </DialogTrigger>
          ) : (
            <DeleteMenuButton disabled />
          )}
        </ContextMenuContent>
      </ContextMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Message</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose>
            <Button type="submit" variant="destructive" onClick={deleteMessage}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
