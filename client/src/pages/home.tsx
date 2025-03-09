import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              PixelFlow
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <AudioPlayer />
            <ThemeToggle />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Focus Timer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-8">
              <TimerDisplay />
              <TimerControls />
              <Button
                variant="default"
                size="lg"
                className="w-full max-w-md"
                asChild
              >
                <Link href="/focus">Enter Focus Mode</Link>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6 flex justify-center">
                <Character 
                  type={preferences?.character || "cat"} 
                  size="large"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions?.map((session) => (
                    <div
                      key={session.id}
                      className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                          {new Date(session.timestamp).toLocaleDateString()}
                        </span>
                        <span className="font-medium">
                          {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                        </span>
                      </div>
                      <span className="text-primary font-bold">
                        {Math.floor(session.duration / 60)}m
                      </span>
                    </div>
                  ))}
                  {(!sessions || sessions.length === 0) && (
                    <p className="text-muted-foreground text-center py-4">
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
  );
}