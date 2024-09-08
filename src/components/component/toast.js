"use client"

import { useToast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"

export function Toast() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: {title},
          description: {desc},
          
        })
      }}
    >
      Add to calendar
    </Button>
  )
}
