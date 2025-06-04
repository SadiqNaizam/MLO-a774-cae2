import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Volume1,
  Repeat,
  Shuffle,
  Maximize2, // For fullscreen or lyrics view toggle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurrentSong {
  id: string | number;
  title: string;
  artist: string;
  imageUrl?: string;
  durationSeconds?: number; // Total duration for progress calculation
}

interface PlaybackControlsBarProps {
  currentSong?: CurrentSong;
  isPlaying: boolean;
  progressPercent: number; // 0-100
  currentTimeSeconds?: number; // For display
  volumePercent: number; // 0-100
  isShuffle?: boolean;
  isRepeat?: 'off' | 'one' | 'all'; // Repeat state
  onPlayPauseClick: () => void;
  onNextClick: () => void;
  onPreviousClick: () => void;
  onSeek: (value: number[]) => void; // Slider gives [value]
  onVolumeChange: (value: number[]) => void; // Slider gives [value]
  onShuffleClick?: () => void;
  onRepeatClick?: () => void;
  onToggleLyrics?: () => void; // Example extra control
  className?: string;
}

const PlaybackControlsBar: React.FC<PlaybackControlsBarProps> = ({
  currentSong,
  isPlaying,
  progressPercent,
  currentTimeSeconds = 0,
  volumePercent,
  isShuffle = false,
  isRepeat = 'off',
  onPlayPauseClick,
  onNextClick,
  onPreviousClick,
  onSeek,
  onVolumeChange,
  onShuffleClick,
  onRepeatClick,
  onToggleLyrics,
  className,
}) => {
  console.log("Rendering PlaybackControlsBar for song:", currentSong?.title, "Playing:", isPlaying);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const VolumeIcon = volumePercent === 0 ? VolumeX : volumePercent < 50 ? Volume1 : Volume2;

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background border-t border-border p-3 md:px-4 shadow-lg z-50",
        "grid grid-cols-3 items-center gap-4", // Using grid for layout
        className
      )}
    >
      {/* Left: Current Song Info */}
      <div className="flex items-center gap-3 min-w-0">
        {currentSong ? (
          <>
            <Avatar className="h-10 w-10 md:h-12 md:w-12 rounded">
              <AvatarImage src={currentSong.imageUrl} alt={currentSong.title} />
              <AvatarFallback>{currentSong.title?.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{currentSong.title || "No Song"}</p>
              <p className="text-xs text-muted-foreground truncate">{currentSong.artist || "Unknown Artist"}</p>
            </div>
          </>
        ) : (
          <div className="text-sm text-muted-foreground">No song playing</div>
        )}
      </div>

      {/* Center: Playback Controls & Progress */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1 md:gap-2">
          {onShuffleClick && (
            <Button variant="ghost" size="icon" className={cn("h-8 w-8 md:h-9 md:w-9", isShuffle ? "text-primary" : "text-muted-foreground hover:text-foreground")} onClick={onShuffleClick} aria-label="Shuffle">
              <Shuffle className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9 text-foreground" onClick={onPreviousClick} aria-label="Previous song" disabled={!currentSong}>
            <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Button variant="default" size="icon" className="h-9 w-9 md:h-10 md:w-10" onClick={onPlayPauseClick} aria-label={isPlaying ? "Pause" : "Play"} disabled={!currentSong}>
            {isPlaying ? <Pause className="h-5 w-5 md:h-6 md:w-6 fill-current" /> : <Play className="h-5 w-5 md:h-6 md:w-6 fill-current" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 md:h-9 md:w-9 text-foreground" onClick={onNextClick} aria-label="Next song" disabled={!currentSong}>
            <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          {onRepeatClick && (
             <Button variant="ghost" size="icon" className={cn("h-8 w-8 md:h-9 md:w-9", isRepeat !== 'off' ? "text-primary" : "text-muted-foreground hover:text-foreground")} onClick={onRepeatClick} aria-label="Repeat">
              <Repeat className="h-4 w-4 md:h-[18px] md:w-[18px]" />
              {isRepeat === 'one' && <span className="absolute text-[8px] font-bold bottom-1 right-1">1</span>}
            </Button>
          )}
        </div>
        {currentSong && (
          <div className="w-full max-w-xs md:max-w-md flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">{formatTime(currentTimeSeconds)}</span>
            <Progress value={progressPercent} className="flex-1 h-1.5 md:h-2" aria-label="Song progress" />
            <span className="text-xs text-muted-foreground w-8 text-left tabular-nums">{formatTime(currentSong.durationSeconds || 0)}</span>
          </div>
        )}
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center justify-end gap-1 md:gap-2">
        {onToggleLyrics && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hidden sm:flex" onClick={onToggleLyrics} aria-label="Lyrics">
                <Maximize2 className="h-4 w-4" /> {/* Example icon, could be something else */}
            </Button>
        )}
        <div className="flex items-center gap-1 md:gap-1.5 w-[100px] md:w-[120px]">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => onVolumeChange([volumePercent > 0 ? 0 : 50])} aria-label="Mute/Unmute">
            <VolumeIcon className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <Slider
            defaultValue={[volumePercent]}
            value={[volumePercent]}
            max={100}
            step={1}
            className="flex-1 [&>span:first-child]:h-1.5 [&>span:first-child>span]:h-1.5" // Make slider thinner
            onValueChange={onVolumeChange}
            aria-label="Volume control"
          />
        </div>
      </div>
    </footer>
  );
}

export default PlaybackControlsBar;