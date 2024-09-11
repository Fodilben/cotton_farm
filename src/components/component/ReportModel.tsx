import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, X, MessageSquare, User, Calendar } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export  function ReportModel() {
  const [message, setMessage] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
 
 
  const [sender, setSender] = useState('')
  const [date, setDate] = useState('')

  const handleAnalyze = () => {
    console.log('Analyzing message:', { message, errorDescription, sender, date })
  }
const handleCancel = () => {
            // Add your cancel logic here
          };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MessageSquare className="w-4 h-4 mr-2" />
          report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Message Analyzer</DialogTitle>
          <DialogDescription>
            Enter the message details for analysis. Click analyze when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="error-description" className="text-right">
              Error
            </Label>
            <Textarea
              id="error-description"
              placeholder="Describe any errors or issues"
              value={errorDescription}
              onChange={(e) => setErrorDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              prompt
            </Label>
            <Textarea
              id="message"
              placeholder="explain to ai"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sender" className="text-right">
              Sender
            </Label>
            <Input
              id="sender"
              placeholder="Message sender"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
         
          
          <Button variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleAnalyze}>
            <AlertCircle className="w-4 h-4 mr-2" />
            Analyze
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}