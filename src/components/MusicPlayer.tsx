
import { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  className?: string;
}

const MusicPlayer = ({ className }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={cn("glass-effect fixed bottom-0 left-0 right-0 p-4 animate-slide-up", className)}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/placeholder.svg"
            alt="Album cover"
            className="w-12 h-12 rounded-md"
          />
          <div>
            <h4 className="font-medium">Song Title</h4>
            <p className="text-sm text-music-subtext">Artist Name</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <button className="text-music-subtext hover:text-music-text transition-colors">
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlay}
              className="w-8 h-8 bg-music-primary rounded-full flex items-center justify-center hover:bg-music-secondary transition-colors"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button className="text-music-subtext hover:text-music-text transition-colors">
              <SkipForward size={20} />
            </button>
          </div>
          <div className="w-96 h-1 bg-music-light rounded-full">
            <div className="w-1/3 h-full bg-music-primary rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 size={20} className="text-music-subtext" />
          <div className="w-24 h-1 bg-music-light rounded-full">
            <div className="w-2/3 h-full bg-music-primary rounded-full" />
          </div>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default MusicPlayer;
