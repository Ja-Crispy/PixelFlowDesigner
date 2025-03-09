import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TimerDisplay from "@/components/timer/TimerDisplay";
import TimerControls from "@/components/timer/TimerControls";
import Character from "@/components/companion/Character";
import ThemeToggle from "@/components/theme/ThemeToggle";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { useTimerStore } from "@/lib/timerStore";

export default function Home() {
  const { data: sessions } = useQuery({
    queryKey: ["/api/sessions/recent"]
  });

  const { data: preferences } = useQuery({
    queryKey: ["/api/preferences"]
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">PixelFlow</h1>
          <div className="flex gap-4">
            <ThemeToggle />
            <AudioPlayer />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <TimerDisplay />
            <TimerControls />
            <Button asChild className="w-full mt-4">
              <Link href="/focus">Enter Focus Mode</Link>
            </Button>
          </Card>

          <div className="space-y-8">
            <Character type={preferences?.character || "cat"} />
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
              <div className="space-y-2">
                {sessions?.map((session) => (
                  <div key={session.id} className="flex justify-between items-center">
                    <span>{new Date(session.timestamp).toLocaleDateString()}</span>
                    <span>{session.duration / 60} minutes</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
