"use client";

import { ReactNode, useEffect, useState } from "react";
import { LocalToken, LocalUsername } from "../localStorage";
import { AuthContext, AuthContextType } from "./authContext";
import { apiUrl } from "@/services/environment";

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = (props) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (token) return;
    const storedUsername = LocalUsername.get();
    const storedToken = LocalToken.get();
    if (storedToken) {
      setToken(storedToken);
      setUsername(storedUsername);
    }
  }, []);

  const contextValue: AuthContextType = {
    username,
    token,
    login: async ({ username, password }) => {
      if (username.length == 0) {
        throw new Error("Username was not provided");
      }
      if (password.length == 0) {
        throw new Error("Password was not provided");
      }
      try {
        const body = { username, password };
        const res = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const { username: resUsername, token: resToken } = await res.json();
        setToken(resToken);
        setUsername(resUsername);
        LocalToken.set(resToken);
        LocalUsername.set(resUsername);
      } catch (error) {
        throw error;
      }
    },
    signup: async ({ username, password }) => {
      if (username.length == 0) {
        throw new Error("Username was not provided");
      }
      if (password.length == 0) {
        throw new Error("Password was not provided");
      }
      try {
        const body = { username, password };
        const res = await fetch(`${apiUrl}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const { username: resUsername, token: resToken } = await res.json();
        setToken(resToken);
        setUsername(resUsername);
        LocalToken.set(resToken);
        LocalUsername.set(resUsername);
      } catch (error) {
        throw error;
      }
    },
    logout: () => {
      LocalToken.reset();
      LocalUsername.reset();
      setToken(null);
      setUsername(null);
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
