import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Session } from "@shared/schema";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
}

function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <Card className="bg-black/40 backdrop-blur pixel-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-white/60">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        {description && (
          <p className="text-xs text-white/60 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default function SessionStats() {
  const { data: sessions } = useQuery<Session[]>({
    queryKey: ["/api/sessions"]
  });

  if (!sessions) return null;

  const totalMinutes = sessions.reduce((acc, session) => acc + session.duration / 60, 0);
  const totalSessions = sessions.length;
  const streak = calculateStreak(sessions);
  const completionRate = calculateCompletionRate(sessions);

  return (
    <div className="grid grid-cols-2 gap-4">
      <StatsCard
        title="Total Focus Time"
        value={`${Math.round(totalMinutes)}m`}
        description="Minutes focused"
      />
      <StatsCard
        title="Sessions"
        value={totalSessions}
        description="Completed sessions"
      />
      <StatsCard
        title="Current Streak"
        value={`${streak}d`}
        description="Days in a row"
      />
      <StatsCard
        title="Completion Rate"
        value={`${completionRate}%`}
        description="Sessions finished"
      />
    </div>
  );
}

function calculateStreak(sessions: Session[]): number {
  if (!sessions.length) return 0;
  
  const today = new Date();
  const sortedDates = sessions
    .map(s => new Date(s.timestamp))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 1;
  let currentDate = sortedDates[0];

  // Check if the most recent session was today or yesterday
  if (differenceInDays(today, currentDate) > 1) return 0;

  for (let i = 1; i < sortedDates.length; i++) {
    if (differenceInDays(currentDate, sortedDates[i]) === 1) {
      streak++;
      currentDate = sortedDates[i];
    } else {
      break;
    }
  }

  return streak;
}

function calculateCompletionRate(sessions: Session[]): number {
  if (!sessions.length) return 0;
  const completed = sessions.filter(s => s.completed).length;
  return Math.round((completed / sessions.length) * 100);
}

function differenceInDays(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date1.getTime() - date2.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
