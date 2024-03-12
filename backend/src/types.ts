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
