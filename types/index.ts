interface User {
  username: string;
}

interface UserWithPassword extends User {
  password: string;
}

interface Message {
  id: number;
  username: string;
  contents: string;
  writtenAt: Date;
}
