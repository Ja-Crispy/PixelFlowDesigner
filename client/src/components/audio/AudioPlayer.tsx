import { useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAudio } from "@/lib/useAudio";

export default function AudioPlayer() {
  const { initSound, playSound, stopSound, setVolume, volume, isPlaying, currentSound } = useAudio();

  useEffect(() => {
    initSound("white-noise");
    initSound("rain");
    initSound("notification");
  }, [initSound]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {isPlaying ? (
            <Volume2 className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <VolumeX className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={([val]) => setVolume(val / 100)}
          />
        </div>
        <DropdownMenuItem onClick={() => currentSound === "white-noise" ? stopSound() : playSound("white-noise")}>
          White Noise
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => currentSound === "rain" ? stopSound() : playSound("rain")}>
          Rain Sounds
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
