export interface User {
  username: string;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface Message {
  id: number;
  username: string;
  content: string;
  writtenAt: number;
}

export interface ServerToClientEvents {
  newMessages: (messages: Message[]) => void;
  deletedMessage: (id: number) => void;
}

export interface ClientToServerEvents {
  sendMessage: (content: string) => void;
  deleteMessage: (id: number) => void;
}

export interface DecodedToken {
  username: string;
}
