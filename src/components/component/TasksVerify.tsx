'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Repeat, CheckSquare } from "lucide-react"

import { useState } from "react"
import { Button } from "../ui/button"
import { Save } from "lucide-react";

interface Task {
  name: string
  category?: string
  status: string
}

interface TaskData {
  todayTasks: Task[]
  habitTasks: Task[]
  completedTasks: Task[]
}
interface TasksVerify {
  analysisResult: string;
}

export function TasksVerify({ analysisResult }: TasksVerify) {
  console.log(analysisResult);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    
    console.log("Saving focus data:");
    setIsSaved(true);
  };
  const taskData: TaskData = JSON.parse(analysisResult);

  const TaskTable = ({ tasks }: { tasks: Task[] }) => (
    <Table>
      <TableHeader>
        <TableRow className="">
          <TableHead className="w-[50%]   font-semibold">
            Task Name
          </TableHead>
          <TableHead className="font-semibold">Category</TableHead>
          <TableHead className=" font-semibold">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, index) => (
          <TableRow key={index} className="border-b">
            <TableCell className="font-medium">{task.name}</TableCell>
            <TableCell>
              {task.category ? (
                <Badge variant="secondary">{task.category}</Badge>
              ) : (
                <span className="text-gray-500">-</span>
              )}
            </TableCell>
            <TableCell>{task.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto p-4 space-y-6 col-span-2">
      <h1 className="text-3xl font-bold text-center mb-6">Tasks Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className=" bg-blue-50">
            <CardTitle className="flex items-center ">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TaskTable tasks={taskData.todayTasks} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className=" bg-purple-50">
            <CardTitle className="flex items-center">
              <Repeat className="w-5 h-5 mr-2 text-purple-600" />
              Habit Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TaskTable tasks={taskData.habitTasks} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className=" bg-green-50">
            <CardTitle className="flex items-center">
              <CheckSquare className="w-5 h-5 mr-2 text-green-600" />
              Completed Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TaskTable tasks={taskData.completedTasks} />
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center mt-6">
        <Button onClick={handleSave} disabled={isSaved}>
          {isSaved ? "Saved!" : "Save Data"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}