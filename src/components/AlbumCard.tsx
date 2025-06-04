import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from '@/lib/utils';

interface AlbumCardProps {
  id: string | number;
  title: string;
  artist?: string; // Or playlist creator
  imageUrl: string;
  type?: 'album' | 'playlist'; // To differentiate styling or context if needed
  onClick?: (id: string | number) => void;
  className?: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  id,
  title,
  artist,
  imageUrl,
  onClick,
  className,
  type = 'album'
}) => {
  console.log("Rendering AlbumCard:", title);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
    console.log(`${type} card clicked:`, title, id);
  };

  return (
    <Card
      className={cn(
        "w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 cursor-pointer group",
        className
      )}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={`${title} ${type} cover`}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-3_5 text-center md:text-left"> {/* Tailwind doesn't have p-3.5, use p-3 or p-4 */}
        <CardTitle className="text-base font-semibold line-clamp-1">{title}</CardTitle>
        {artist && <CardDescription className="text-xs line-clamp-1 mt-0.5">{artist}</CardDescription>}
      </CardContent>
    </Card>
  );
}

export default AlbumCard;