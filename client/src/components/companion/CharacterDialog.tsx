import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const CHARACTERS = [
  { id: "cat", emoji: "🐱", name: "Pixel Cat" },
  { id: "robot", emoji: "🤖", name: "Robot Friend" },
  { id: "pixel", emoji: "👾", name: "Pixel Buddy" },
  { id: "ghost", emoji: "👻", name: "Ghost Pal" },
];

export default function CharacterDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

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
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={() => mutation.mutate(char.id)}
            >
              <span className="text-2xl">{char.emoji}</span>
              <span className="text-sm">{char.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
