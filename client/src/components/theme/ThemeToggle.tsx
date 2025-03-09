import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ThemeToggle() {
  const { data: preferences } = useQuery({
    queryKey: ["/api/preferences"]
  });

  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async (theme: string) => {
      await apiRequest("PATCH", "/api/preferences", { theme });
    },
    onSuccess: () => {
      toast({
        title: "Theme updated",
        description: "Your preference has been saved."
      });
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => mutation.mutate("minimalist")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => mutation.mutate("y2k")}>
          Y2K
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
