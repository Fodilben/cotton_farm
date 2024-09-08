'use clients'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import LineChart from "./LineChart"; // Assuming LineChart is in the same directory

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Score</CardTitle>
            <CardDescription>Your overall productivity score</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="text-4xl font-bold">87</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Goal</CardTitle>
            <CardDescription>Your daily productivity target</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="text-4xl font-bold">6 hrs</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Streak</CardTitle>
            <CardDescription>
              Consecutive days of hitting your goal
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="text-4xl font-bold">14</div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Trends</CardTitle>
            <CardDescription>Your productivity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart className="w-full aspect-[4/3]" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
