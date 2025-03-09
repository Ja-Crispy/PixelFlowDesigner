import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Session } from "@shared/schema";
import { subDays, format, isSameDay } from "date-fns";

export default function ActivityHeatmap() {
  const { data: sessions } = useQuery<Session[]>({
    queryKey: ["/api/sessions"]
  });

  if (!sessions) return null;

  // Generate last 60 days
  const days = Array.from({ length: 60 }, (_, i) => subDays(new Date(), i));

  // Count total duration per day in minutes
  const sessionDurations = days.map(day => {
    const daysSessions = sessions.filter(session => 
      isSameDay(new Date(session.timestamp), day)
    );
    const totalMinutes = daysSessions.reduce((acc, session) => 
      acc + (session.duration / 60), 0
    );
    return {
      date: day,
      minutes: totalMinutes
    };
  });

  // Get max duration for intensity calculation
  const maxMinutes = Math.max(...sessionDurations.map(d => d.minutes));

  // GitHub-like color function
  const getColor = (minutes: number) => {
    if (minutes === 0) return 'bg-white/5';
    const intensity = minutes / maxMinutes;
    if (intensity <= 0.25) return 'bg-primary/20';
    if (intensity <= 0.5) return 'bg-primary/40';
    if (intensity <= 0.75) return 'bg-primary/60';
    return 'bg-primary';
  };

  return (
    <Card className="bg-black/40 backdrop-blur pixel-border">
      <CardHeader>
        <CardTitle className="text-white">Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-1">
          {sessionDurations.map(({ date, minutes }, i) => (
            <div
              key={i}
              className={`
                w-full aspect-square rounded-sm cursor-help
                ${getColor(minutes)}
              `}
              title={`${format(date, 'MMM d, yyyy')}: ${Math.round(minutes)} minutes`}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-white/60">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-white/5 rounded-sm" />
            <div className="w-3 h-3 bg-primary/20 rounded-sm" />
            <div className="w-3 h-3 bg-primary/40 rounded-sm" />
            <div className="w-3 h-3 bg-primary/60 rounded-sm" />
            <div className="w-3 h-3 bg-primary rounded-sm" />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}