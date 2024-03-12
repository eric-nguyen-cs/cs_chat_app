import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <>
      <div className="min-h-[100vh] flex justify-center items-center bg-slate-50">
        <div className="flex flex-col space-y-10 w-96 h-72 pl-8 pr-8 justify-center rounded-lg shadow-md bg-white">
          <h1 className="text-2xl font-bold">Log In</h1>
          <div className="flex flex-col">
            <Input type="username" placeholder="Username" className="mb-2" />
            <Input type="password" placeholder="Password" className="mb-4" />
            <Button type="submit" className="w-16">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
