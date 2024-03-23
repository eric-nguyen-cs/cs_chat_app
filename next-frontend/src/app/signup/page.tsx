"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/services/environment";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Login() {
  const router = useRouter();
  const sendSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(apiUrl + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.currentTarget.username.value,
          password: event.currentTarget.password.value,
        }),
      });
      await router.push("/");
    } catch {
      console.error("Error while trying to sign up");
    }
  };

  return (
    <>
      <div className="min-h-[100vh] flex justify-center items-center bg-slate-50">
        <div className="flex flex-col space-y-10 w-96 h-72 pl-8 pr-8 justify-center rounded-lg shadow-md bg-white">
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              sendSignUp(e);
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
            <Button type="submit" className="w-16">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
