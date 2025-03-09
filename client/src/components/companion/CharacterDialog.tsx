import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Character from "./Character";

const CHARACTERS = [
  { id: "cat", emoji: "🐱", name: "Pixel Cat" },
  { id: "robot", emoji: "🤖", name: "Robot Friend" },
  { id: "pixel", emoji: "👾", name: "Pixel Buddy" },
  { id: "ghost", emoji: "👻", name: "Ghost Pal" },
];

export default function CharacterDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { data: preferences } = useQuery({
    queryKey: ["/api/preferences"]
  });

  const mutation = useMutation({
    mutationFn: async (character: string) => {
      await apiRequest("PATCH", "/api/preferences", { character });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/preferences"] });
      setOpen(false);
      toast({
        title: "Character updated!",
        description: "Your companion has been changed.",
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Change Character</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Your Companion</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 p-4">
          {CHARACTERS.map((char) => (
            <Button
              key={char.id}
              variant={preferences?.character === char.id ? "default" : "outline"}
              className="h-32 flex flex-col gap-2 relative overflow-hidden"
              onClick={() => mutation.mutate(char.id)}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Character type={char.id} size="large" />
              </div>
              <span className="text-2xl relative z-10">{char.emoji}</span>
              <span className="text-sm relative z-10">{char.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}