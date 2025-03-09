import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import TimerDisplay from "@/components/timer/TimerDisplay";
import TimerControls from "@/components/timer/TimerControls";
import Character from "@/components/companion/Character";
import { useTimerStore } from "@/lib/timerStore";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function Focus() {
  const [, setLocation] = useLocation();
  const { isRunning } = useTimerStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLocation("/");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setLocation]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background flex flex-col items-center justify-center"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => setLocation("/")}
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="text-center space-y-8">
        <TimerDisplay size="large" />
        <TimerControls />

        <motion.div
          animate={{ scale: isRunning ? 1.1 : 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <Character size="large" />
        </motion.div>
      </div>
    </motion.div>
  );
}