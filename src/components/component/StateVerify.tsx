'use client'
import { AlertCircle, X, MessageSquare, User, Calendar } from "lucide-react";
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Save } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReportModel } from "./ReportModel";
interface FocusStatistics {
  todaysPomos: number
  todaysFocusTime: string
  totalPomos: number
  totalFocusDuration: string
}

interface FocusRecord {
  time: string
  activity: string
  duration: string
}

interface FocusData {
  focusStatistics: FocusStatistics
  focusRecord: FocusRecord[]
}


interface StateVerify {
  analysisResult: string;
}
export function StateVerify({ analysisResult }: StateVerify) {
  const [isSaved, setIsSaved] = useState(false);
 
  const focusData: FocusData = JSON.parse(analysisResult);
console.log(focusData);

  const handleSave = () => {
    // Here you would typically send the data to a server or local storage
    console.log("Saving focus data:", focusData);
    setIsSaved(true);
  };
  
 
  return (
    <div className="container mx-auto p-4 space-y-6 col-span-2">
      <h1 className="text-3xl font-bold text-center mb-6">Focus Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Pomodoros"
          value={focusData.focusStatistics.todaysPomos}
        />
        <StatCard
          title="Today's Focus Time"
          value={focusData.focusStatistics.todaysFocusTime}
        />
        <StatCard
          title="Total Pomodoros"
          value={focusData.focusStatistics.totalPomos}
        />
        <StatCard
          title="Total Focus Duration"
          value={focusData.focusStatistics.totalFocusDuration}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Focus Record</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {focusData.focusRecord.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.time}</TableCell>
                  <TableCell>{record.activity}</TableCell>
                  <TableCell>{record.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    
      
      <div className="flex justify-center">
        <Button onClick={handleSave} disabled={isSaved}>
          {isSaved ? "Saved!" : "Save Data"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}