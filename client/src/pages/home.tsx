import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TimerDisplay from "@/components/timer/TimerDisplay";
import TimerControls from "@/components/timer/TimerControls";
import Character from "@/components/companion/Character";
import ThemeToggle from "@/components/theme/ThemeToggle";
import AudioPlayer from "@/components/audio/AudioPlayer";
import SessionStats from "@/components/stats/SessionStats";
import { useTimerStore } from "@/lib/timerStore";

export default function Home() {
  const { data: sessions } = useQuery({
    queryKey: ["/api/sessions/recent"]
  });

  const { data: preferences } = useQuery({
    queryKey: ["/api/preferences"]
  });

  const { isRunning } = useTimerStore();

  return (
    <div className="min-h-screen">
      <div className="relative">
        {/* Pixel art clouds */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-1/4 w-16 h-8 bg-white/20 rounded-full" />
          <div className="absolute top-24 right-1/3 w-24 h-12 bg-white/20 rounded-full" />
          <div className="absolute top-48 left-1/3 w-20 h-10 bg-white/20 rounded-full" />
        </div>

        <div className="container mx-auto px-4 py-8 relative">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-pixel text-white pixel-shadow">
                PixelFlow
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <AudioPlayer />
              <ThemeToggle />
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 bg-black/40 backdrop-blur pixel-border">
              <CardHeader>
                <CardTitle className="text-center text-white">Focus Timer</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-8">
                <TimerDisplay />
                <TimerControls />
                <Button
                  variant="default"
                  size="lg"
                  className="w-full max-w-md bg-primary/80 hover:bg-primary font-pixel text-sm"
                  asChild
                >
                  <Link href="/focus">Enter Focus Mode</Link>
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="bg-black/40 backdrop-blur pixel-border">
                <CardContent className="pt-6 flex justify-center">
                  <Character 
                    type={preferences?.character || "cat"} 
                    size="large"
                    state={isRunning ? "focused" : "idle"}
                  />
                </CardContent>
              </Card>

              <SessionStats />

              <Card className="bg-black/40 backdrop-blur pixel-border">
                <CardHeader>
                  <CardTitle className="text-white">Recent Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sessions?.map((session) => (
                      <div
                        key={session.id}
                        className="flex justify-between items-center p-3 bg-white/5 rounded-lg pixel-border"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm text-white/60">
                            {new Date(session.timestamp).toLocaleDateString()}
                          </span>
                          <span className="font-medium text-white">
                            {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                          </span>
                        </div>
                        <span className="text-primary font-bold">
                          {Math.floor(session.duration / 60)}m
                        </span>
                      </div>
                    ))}
                    {(!sessions || sessions.length === 0) && (
                      <p className="text-white/60 text-center py-4">
                        No sessions yet. Start your first timer!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}