import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
        <p className="text-muted-foreground">Choose a page to continue.</p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/register">Register</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
