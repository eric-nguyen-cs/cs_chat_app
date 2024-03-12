"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiUrl } from "@/services/environment";
import { FormEvent } from "react";

export default function Login() {
  const sendLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: event.currentTarget.username.value,
        password: event.currentTarget.password.value,
      }),
    }).then((res) => console.log(res.json()));
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
            <Button type="submit" className="w-16">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
