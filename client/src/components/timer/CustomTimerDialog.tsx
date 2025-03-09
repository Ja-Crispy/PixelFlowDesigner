import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTimerStore } from "@/lib/timerStore";

export default function CustomTimerDialog() {
  const [minutes, setMinutes] = useState("60");
  const { setMode } = useTimerStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const duration = Math.max(1, Math.min(180, parseInt(minutes, 10))) * 60;
    setMode("custom", duration);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Custom
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Custom Timer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="minutes" className="text-sm font-medium leading-none">
              Duration (minutes)
            </label>
            <Input
              id="minutes"
              type="number"
              min="1"
              max="180"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="col-span-3"
            />
            <span className="text-xs text-muted-foreground">
              Enter a duration between 1 and 180 minutes
            </span>
          </div>
          <Button type="submit" className="w-full">
            Start Timer
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
