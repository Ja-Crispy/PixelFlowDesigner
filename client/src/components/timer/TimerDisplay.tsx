import { useEffect } from "react";
import { motion } from "framer-motion";
import { useTimerStore } from "@/lib/timerStore";
import { Progress } from "@/components/ui/progress";

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
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        className={`font-mono font-bold ${
          size === "large" ? "text-8xl" : "text-6xl"
        }`}
        animate={{ scale: isRunning ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </motion.div>

      <Progress value={progress} className="w-full" />
    </div>
  );
}