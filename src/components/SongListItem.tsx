import React from 'react';
import { Button } from "@/components/ui/button";
import { Heart, PlayCircle, PlusCircle, MoreHorizontal, PauseCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For small album art

interface SongListItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string; // Optional
  duration: string; // e.g., "3:45"
  imageUrl?: string; // Optional: for small album art next to song
  isLiked?: boolean;
  isPlaying?: boolean;
  onPlayClick?: (id: string | number) => void;
  onLikeClick?: (id: string | number) => void;
  onAddToPlaylistClick?: (id: string | number) => void;
  onMoreOptionsClick?: (id: string | number, event: React.MouseEvent) => void;
  className?: string;
}

const SongListItem: React.FC<SongListItemProps> = ({
  id,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isLiked = false,
  isPlaying = false,
  onPlayClick,
  onLikeClick,
  onAddToPlaylistClick,
  onMoreOptionsClick,
  className,
}) => {
  console.log("Rendering SongListItem:", title, "- Playing:", isPlaying);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click if play button is clicked
    onPlayClick?.(id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeClick?.(id);
  };

  const handleAddToPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToPlaylistClick?.(id);
  };

  const handleMoreOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoreOptionsClick?.(id, e);
  };


  return (
    <div
      className={cn(
        "flex items-center p-2 md:p-3 rounded-md hover:bg-muted/80 transition-colors cursor-default group",
        isPlaying ? "bg-primary/10 text-primary" : "",
        className
      )}
      onClick={() => onPlayClick?.(id)} // Click row to play
    >
      <div className="flex items-center flex-1 min-w-0 gap-3 md:gap-4">
        {imageUrl ? (
           <Avatar className="h-10 w-10 rounded">
             <AvatarImage src={imageUrl} alt={album || title} />
             <AvatarFallback>{title.charAt(0)}</AvatarFallback>
           </Avatar>
        ) : (
          // Play/Pause button directly if no image
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 md:h-10 md:w-10"
            onClick={handlePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseCircle className="h-5 w-5 md:h-6 md:w-6" /> : <PlayCircle className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground group-hover:text-primary" />}
          </Button>
        )}
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-medium truncate", isPlaying ? "text-primary" : "text-foreground")}>{title}</p>
          <p className="text-xs text-muted-foreground truncate">{artist}</p>
        </div>
      </div>

      {/* Optional: Album name (hidden on small screens or if too cluttered) */}
      {album && <div className="hidden lg:block text-xs text-muted-foreground w-1/4 truncate px-2">{album}</div>}

      <div className="flex items-center gap-1 md:gap-2 ml-auto pl-2">
        {onLikeClick && (
            <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground")}
                onClick={handleLike}
                aria-label={isLiked ? "Unlike" : "Like"}
            >
                <Heart className={cn("h-4 w-4", isLiked ? "fill-current" : "")} />
            </Button>
        )}
        <span className="text-xs text-muted-foreground w-10 text-right">{duration}</span>
        {onAddToPlaylistClick && (
             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hidden group-hover:flex md:flex" onClick={handleAddToPlaylist} aria-label="Add to playlist">
                <PlusCircle className="h-4 w-4" />
            </Button>
        )}
        {onMoreOptionsClick && (
             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hidden group-hover:flex md:flex" onClick={handleMoreOptions} aria-label="More options">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        )}
      </div>
    </div>
  );
}

export default SongListItem;