/**
 * v0 by Vercel.
 * @see https://v0.dev/t/zvn30hOQb53
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Component() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="grid w-full max-w-md gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Productivity Tracker</CardTitle>
              <CardDescription>
                Track your tasks, pomodoros, and productivity metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full">Sign In</Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="#" className="underline" prefetch={false}>
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="grid w-full max-w-4xl gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Productivity Dashboard</CardTitle>
              <CardDescription>
                Track your daily tasks, pomodoros, and productivity metrics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Tasks</div>
                    <div className="text-sm font-medium">12 / 20</div>
                  </div>
                  <Progress value={60} />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Pomodoros</div>
                    <div className="text-sm font-medium">18 / 25</div>
                  </div>
                  <Progress value={72} />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Productivity</div>
                    <div className="text-sm font-medium">84%</div>
                  </div>
                  <Progress value={84} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pomodoros-day-expectation">
                    Pomodoros Day Expectation
                  </Label>
                  <Input
                    id="pomodoros-day-expectation"
                    type="number"
                    placeholder="Enter your daily pomodoro expectation"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                View and update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="text-lg font-medium">Jared Palmer</div>
                    <div className="text-sm text-muted-foreground">
                      jared@acme.inc
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Jared Palmer" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="jared@acme.inc"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full">Update Profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="grid w-full max-w-4xl gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
              <CardDescription>
                Manage your daily tasks and track your progress.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Finish weekly report</div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Due: April 15, 2023
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      Prepare for client meeting
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Due: April 20, 2023
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      Implement new feature in codebase
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Due: April 30, 2023
                  </div>
                </div>
                <Button size="sm" className="justify-self-start">
                  Add New Task
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pomodoros</CardTitle>
              <CardDescription>
                Plan and track your daily pomodoros for better focus.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Finish weekly report</div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    4 / 5 pomodoros completed
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      Prepare for client meeting
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    2 / 3 pomodoros completed
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">
                      Implement new feature in codebase
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <CheckIcon className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    0 / 4 pomodoros completed
                  </div>
                </div>
                <Button size="sm" className="justify-self-start">
                  Add New Pomodoro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full">Sign Up</Button>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="#" className="underline" prefetch={false}>
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
