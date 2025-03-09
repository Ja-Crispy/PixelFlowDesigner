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
  
  // Count sessions per day
  const sessionCounts = days.map(day => {
    const count = sessions.filter(session => 
      isSameDay(new Date(session.timestamp), day)
    ).length;
    return {
      date: day,
      count
    };
  });

  // Get max count for intensity calculation
  const maxCount = Math.max(...sessionCounts.map(d => d.count));
  
  return (
    <Card className="bg-black/40 backdrop-blur pixel-border">
      <CardHeader>
        <CardTitle className="text-white">Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-1">
          {sessionCounts.map(({ date, count }, i) => (
            <div
              key={i}
              className={`
                w-full aspect-square rounded-sm cursor-help
                ${count === 0 ? 'bg-white/5' : ''}
                ${count > 0 && count <= maxCount / 3 ? 'bg-primary/30' : ''}
                ${count > maxCount / 3 && count <= (2 * maxCount) / 3 ? 'bg-primary/60' : ''}
                ${count > (2 * maxCount) / 3 ? 'bg-primary' : ''}
              `}
              title={`${format(date, 'MMM d, yyyy')}: ${count} sessions`}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-white/60">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-white/5 rounded-sm" />
            <div className="w-3 h-3 bg-primary/30 rounded-sm" />
            <div className="w-3 h-3 bg-primary/60 rounded-sm" />
            <div className="w-3 h-3 bg-primary rounded-sm" />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
