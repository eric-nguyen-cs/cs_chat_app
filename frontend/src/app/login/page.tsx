"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/services/auth";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Login() {
  const { login } = useAuthContext();
  const router = useRouter();

  const sendLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({
        username: event.currentTarget.username.value,
        password: event.currentTarget.password.value,
      });
      await router.push("/");
    } catch {
      console.error("Error while trying to log in");
    }
  };

  return (
    <>
      <div className="min-h-[100vh] flex justify-center items-center bg-slate-50">
        <div className="flex flex-col space-y-10 w-96 h-72 pl-8 pr-8 justify-center rounded-lg shadow-md bg-white">
          <h1 className="text-2xl font-bold">Log In</h1>
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              sendLogin(e);
            }}
          >
            <Input
              type="text"
              name="username"
              placeholder="Username"
              className="mb-2"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="mb-4"
            />
            <div className="flex justify-between items-center">
              <Button type="submit">Submit</Button>
              <p className="text-xs text-gray-600">
                or
                <Button
                  variant="link"
                  className="p-0 pl-2"
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
