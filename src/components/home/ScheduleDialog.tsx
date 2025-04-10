
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleDialog({ isOpen, onClose }: ScheduleDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !date || !time) {
      toast.error("Please fill out all fields");
      return;
    }
    
    // In a real app, this would send data to a server
    toast.success("Demo scheduled!", {
      description: `Thanks ${name}! We'll email you a confirmation for ${format(date, "PPP")} at ${time}.`,
      duration: 5000,
    });
    
    // Reset form and close dialog
    setName("");
    setEmail("");
    setDate(undefined);
    setTime("");
    onClose();
  };
  
  const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Schedule a Demo</DialogTitle>
          <DialogDescription>
            Choose a date and time for your personalized demo with our financial experts.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    // Disable past dates and weekends
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);
                    const day = date.getDay();
                    return date < now || day === 0 || day === 6;
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="time">Select Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className="w-full">
                <SelectValue placeholder="Select a time">
                  {time ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </div>
                  ) : (
                    "Select a time"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((t) => (
                  <SelectItem key={t} value={t}>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {t}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter className="pt-4">
            <Button variant="outline" type="button" onClick={onClose} className="mr-2">Cancel</Button>
            <Button type="submit">Schedule Demo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
