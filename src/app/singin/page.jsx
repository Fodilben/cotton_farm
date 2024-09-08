'use client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

import { redirect, useRouter } from 'next/navigation'

export default function Component() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
const router =useRouter()
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password, username}),
      });

      const data = await res.json();
      
      if (res.ok) {
        redirect('/login')
        setLoading(false)

      } else {
        setError(data.error || 'Login failed');
        setLoading(false)
      }
    };
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="grid w-full max-w-md gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create your Productivity Tracker account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" value={username}
                onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com"  value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && (
                <div className="text-red-500">
                  <p>{error}</p>
                </div>
              )}
                <Button className="w-full"  disabled={loading} type='submit'> {loading ? 'Signing Up...' : 'Sign Up'}
       </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline" prefetch={false}>
                  log in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
