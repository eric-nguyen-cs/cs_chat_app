import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/services/auth";
import Link from "next/link";

interface AuthButtonsProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuthButtons: React.FC<AuthButtonsProps> = ({ className }) => {
  const { username, logout } = useAuthContext();
  return (
    <>
      {username ? (
        <div className={cn(className, "flex items-center")}>
          <p className="mr-2 text-xs">
            Logged as <span className="font-bold text-base">{username}</span>
          </p>
          <Button className="mr-4" onClick={() => logout()}>
            Log out
          </Button>
        </div>
      ) : (
        <div className={cn("flex gap-3", className)}>
          <Link
            className="h-9 px-4 py-2 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90"
            href={"/signup"}
          >
            Sign Up
          </Link>
          <Link
            className="h-9 px-4 py-2 rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90"
            href={"/login"}
          >
            Log In
          </Link>
        </div>
      )}
    </>
  );
};

export default function Header() {
  return (
    <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
      <div className="fixed left-0 top-0 flex w-full border-b items-center justify-between border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 px-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <p>CentraleSupélec Chat App</p>
        <AuthButtons className="lg:hidden" />
      </div>
      <AuthButtons className="hidden lg:flex" />
    </div>
  );
}
