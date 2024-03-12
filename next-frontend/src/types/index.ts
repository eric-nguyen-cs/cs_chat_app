interface User {
  username: string;
}

interface UserWithPassword extends User {
  password: string;
}

interface Message {
  id: number;
  username: string;
  content: string;
  writtenAt: Date;
}
