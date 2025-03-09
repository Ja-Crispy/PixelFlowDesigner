import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTimerStore } from "@/lib/timerStore";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TimerDisplayProps {
  size?: "normal" | "large";
}

export default function TimerDisplay({ size = "normal" }: TimerDisplayProps) {
  const { time, isRunning, duration, tick } = useTimerStore();

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(tick, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = (time / duration) * 100;

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md">
      <motion.div
        className={cn(
          "font-mono font-bold tabular-nums",
          size === "large" ? "text-8xl" : "text-6xl"
        )}
        animate={{ 
          scale: isRunning ? [1, 1.02, 1] : 1,
          color: isRunning ? ["hsl(var(--primary))", "hsl(var(--primary))", "hsl(var(--foreground))"] : "hsl(var(--foreground))"
        }}
        transition={{ 
          duration: 1,
          repeat: isRunning ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {String(minutes).padStart(2, "0")}
        <span className="opacity-50">:</span>
        {String(seconds).padStart(2, "0")}
      </motion.div>

      <div className="w-full space-y-2">
        <Progress 
          value={progress} 
          className="h-2"
        />
        <p className="text-center text-sm text-muted-foreground">
          {Math.floor((duration - time) / 60)} minutes remaining
        </p>
      </div>
    </div>
  );
}