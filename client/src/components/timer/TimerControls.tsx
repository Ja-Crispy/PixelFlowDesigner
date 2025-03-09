import { useTimerStore } from "@/lib/timerStore";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

export default function TimerControls() {
  const { isRunning, mode, duration, startTimer, pauseTimer, resetTimer, setMode } = useTimerStore();
  const { toast } = useToast();

  const handleModeChange = (newMode: "pomodoro" | "flow" | "custom") => {
    const durations = {
      pomodoro: 1500, // 25 minutes
      flow: 5400,     // 90 minutes
      custom: 3600    // 60 minutes
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

      queryClient.invalidateQueries({ queryKey: ["/api/sessions/recent"] });

      toast({
        title: "Session completed!",
        description: "Your progress has been saved.",
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
    <div className="w-full max-w-md space-y-6">
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          className="w-16 h-16 rounded-full"
          onClick={() => isRunning ? pauseTimer() : startTimer()}
        >
          {isRunning ? 
            <Pause className="h-8 w-8" /> : 
            <Play className="h-8 w-8 ml-1" />
          }
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          className="w-16 h-16 rounded-full"
          onClick={resetTimer}
        >
          <RotateCcw className="h-8 w-8" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button
          variant={mode === "pomodoro" ? "default" : "outline"}
          className="w-full"
          onClick={() => handleModeChange("pomodoro")}
        >
          Pomodoro
        </Button>
        <Button
          variant={mode === "flow" ? "default" : "outline"}
          className="w-full"
          onClick={() => handleModeChange("flow")}
        >
          Flow
        </Button>
        <Button
          variant={mode === "custom" ? "default" : "outline"}
          className="w-full"
          onClick={() => handleModeChange("custom")}
        >
          Custom
        </Button>
      </div>
    </div>
  );
}