import { useTimerStore } from "@/lib/timerStore";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function TimerControls() {
  const { isRunning, mode, duration, startTimer, pauseTimer, resetTimer, setMode } = useTimerStore();
  const { toast } = useToast();

  const handleModeChange = (newMode: "pomodoro" | "flow" | "custom") => {
    const durations = {
      pomodoro: 1500,
      flow: 5400,
      custom: 3600
    };
    setMode(newMode, durations[newMode]);
  };

  const handleComplete = async () => {
    try {
      await apiRequest("POST", "/api/sessions", {
        duration,
        type: mode,
        completed: 1
      });
      toast({
        title: "Session completed!",
        description: "Your progress has been saved."
      });
    } catch (error) {
      toast({
        title: "Error saving session",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => isRunning ? pauseTimer() : startTimer()}
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="outline" size="icon" onClick={resetTimer}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex justify-center gap-2">
        <Button
          variant={mode === "pomodoro" ? "default" : "outline"}
          onClick={() => handleModeChange("pomodoro")}
        >
          Pomodoro
        </Button>
        <Button
          variant={mode === "flow" ? "default" : "outline"}
          onClick={() => handleModeChange("flow")}
        >
          Flow
        </Button>
        <Button
          variant={mode === "custom" ? "default" : "outline"}
          onClick={() => handleModeChange("custom")}
        >
          Custom
        </Button>
      </div>
    </div>
  );
}
