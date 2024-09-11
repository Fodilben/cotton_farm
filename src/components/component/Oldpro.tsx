import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Productivity() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <Card>
        <CardHeader>
          <CardTitle>Set Goal</CardTitle>
          <CardDescription>
            Define your daily productivity target
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Daily Goal (hours)</Label>
              <Input id="goal" type="number" placeholder="Enter goal" />
            </div>
            <Button type="submit" className="w-full">
              Set Goal
            </Button>
          </form>
        </CardContent>
      </Card>
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