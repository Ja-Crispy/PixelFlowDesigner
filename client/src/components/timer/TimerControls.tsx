import { useTimerStore } from "@/lib/timerStore";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import CustomTimerDialog from "./CustomTimerDialog";
import { useEffect } from "react";

export default function TimerControls() {
  const { isRunning, mode, duration, time, startTimer, pauseTimer, resetTimer, setMode } = useTimerStore();
  const { toast } = useToast();

  const handleModeChange = (newMode: "pomodoro" | "flow" | "52-17" | "90-15" | "custom") => {
    const durations = {
      pomodoro: 1500,  // 25 minutes
      flow: 5400,      // 90 minutes
      "52-17": 3120,   // 52 minutes
      "90-15": 5400,   // 90 minutes
    };
    if (newMode !== "custom") {
      setMode(newMode, durations[newMode]);
    }
  };

  const handleComplete = async () => {
    if (time <= 0) {
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
    }
  };

  // Check for timer completion
  useEffect(() => {
    if (time <= 0 && isRunning) {
      handleComplete();
      pauseTimer();
    }
  }, [time, isRunning]);

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

      <div className="grid grid-cols-2 gap-4">
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
          variant={mode === "52-17" ? "default" : "outline"}
          className="w-full"
          onClick={() => handleModeChange("52-17")}
        >
          52/17
        </Button>
        <Button
          variant={mode === "90-15" ? "default" : "outline"}
          className="w-full"
          onClick={() => handleModeChange("90-15")}
        >
          90/15
        </Button>
        <div className="col-span-2">
          <CustomTimerDialog />
        </div>
      </div>
    </div>
  );
}