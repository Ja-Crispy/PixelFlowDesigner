import { useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAudio } from "@/lib/useAudio";

export default function AudioPlayer() {
  const { initSound, playSound, stopSound, setVolume, volume, isPlaying, currentSound } = useAudio();

  useEffect(() => {
    // Initialize all sounds
    ['white-noise', 'rain', 'cafe', 'forest', 'lofi', 'notification'].forEach(sound => {
      initSound(sound as any);
    });
  }, [initSound]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          {isPlaying ? (
            <Volume2 className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <VolumeX className="h-[1.2rem] w-[1.2rem]" />
          )}
          {isPlaying && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Volume</DropdownMenuLabel>
        <div className="p-2">
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={([val]) => setVolume(val / 100)}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Ambient Sounds</DropdownMenuLabel>
        <DropdownMenuItem 
          onClick={() => currentSound === "white-noise" ? stopSound() : playSound("white-noise")}
          className="font-medium"
        >
          🌊 White Noise
          {currentSound === "white-noise" && <span className="ml-2 text-primary">▶</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => currentSound === "rain" ? stopSound() : playSound("rain")}
          className="font-medium"
        >
          🌧 Rain Sounds
          {currentSound === "rain" && <span className="ml-2 text-primary">▶</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => currentSound === "cafe" ? stopSound() : playSound("cafe")}
          className="font-medium"
        >
          ☕️ Cafe Ambience
          {currentSound === "cafe" && <span className="ml-2 text-primary">▶</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => currentSound === "forest" ? stopSound() : playSound("forest")}
          className="font-medium"
        >
          🌲 Forest Sounds
          {currentSound === "forest" && <span className="ml-2 text-primary">▶</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => currentSound === "lofi" ? stopSound() : playSound("lofi")}
          className="font-medium"
        >
          🎵 Lofi Music
          {currentSound === "lofi" && <span className="ml-2 text-primary">▶</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}