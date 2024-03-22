import { createContext } from 'react';

export interface Credentials {
  username: string;
  password: string;
}

export interface AuthContextType {
  login: (creds: Credentials) => Promise<void>;
  logout: () => void;
  username: string | null;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
