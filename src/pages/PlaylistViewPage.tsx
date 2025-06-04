import React from 'react';
import { useParams } from 'react-router-dom';
import DoraemonLogoComponent from '@/components/DoraemonLogoComponent';
import Sidebar from '@/components/layout/Sidebar';
import SongListItem from '@/components/SongListItem';
import PlaybackControlsBar from '@/components/PlaybackControlsBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlayIcon, ShuffleIcon, MoreHorizontalIcon } from 'lucide-react';

const placeholderPlaylist = {
  id: 'dora-happy-tunes',
  name: "Dora's Happy Tunes",
  description: "A collection of cheerful songs handpicked by Doraemon himself!",
  creator: "Doraemon",
  imageUrl: 'https://picsum.photos/seed/doraemonplaylist/400/400',
  songs: [
    { id: 's1', title: 'Doraemon March', artist: 'Nobuyo Oyama', duration: '2:50', imageUrl: 'https://picsum.photos/seed/doramarch/100/100', album: 'Doraemon Classics' },
    { id: 's2', title: 'Pocket Full of Sunshine', artist: 'The Gadgets', duration: '3:20', imageUrl: 'https://picsum.photos/seed/pocketsun/100/100', album: 'Future Sounds' },
    { id: 's3', title: 'Blue Cat Blues (Happy Ver.)', artist: 'Doraemon & Friends', duration: '4:10', imageUrl: 'https://picsum.photos/seed/bluecat/100/100', album: 'Friendship Melodies' },
    { id: 's4', title: 'Anywhere Door Hop', artist: 'Teleportones', duration: '2:15', imageUrl: 'https://picsum.photos/seed/anywheredoor/100/100', album: 'Travel Tracks' },
  ]
};

const commonPlaybackProps = {
  isPlaying: false,
  progressPercent: 10,
  volumePercent: 70,
  onPlayPauseClick: () => console.log('PlaylistViewPage: Play/Pause clicked'),
  onNextClick: () => console.log('PlaylistViewPage: Next clicked'),
  onPreviousClick: () => console.log('PlaylistViewPage: Previous clicked'),
  onSeek: (value: number[]) => console.log('PlaylistViewPage: Seek to', value[0]),
  onVolumeChange: (value: number[]) => console.log('PlaylistViewPage: Volume to', value[0]),
  currentSong: {
    id: 's1',
    title: 'Doraemon March',
    artist: 'Nobuyo Oyama',
    imageUrl: 'https://picsum.photos/seed/doramarch/100/100',
    durationSeconds: 170,
  }
};

const PlaylistViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get playlist ID from URL
  console.log('PlaylistViewPage loaded for playlist ID:', id);
  // In a real app, fetch playlist details based on `id`
  const playlist = placeholderPlaylist; // Using placeholder

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar className="h-full fixed lg:static w-64 hidden lg:block" />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64">
        <header className="p-4 border-b flex items-center justify-between shrink-0 sticky top-0 bg-background z-10">
          <div className="flex items-center gap-4">
            <DoraemonLogoComponent width={40} />
             {/* Input might not be relevant here, or could be for filtering within playlist */}
          </div>
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Button variant="ghost" size="icon"><MoreHorizontalIcon className="h-5 w-5" /></Button>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>

        <ScrollArea className="flex-1 pb-28"> {/* No horizontal padding needed if content handles it */}
          <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-b from-blue-700/30 to-background">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
              <Avatar className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg shadow-lg">
                <AvatarImage src={playlist.imageUrl} alt={playlist.name} />
                <AvatarFallback>{playlist.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Playlist</p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold my-2 break-words">{playlist.name}</h1>
                <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
                <p className="text-sm">Created by <span className="font-semibold">{playlist.creator}</span> • {playlist.songs.length} songs</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white rounded-full px-8 py-3">
                    <PlayIcon className="mr-2 h-5 w-5 fill-current" /> Play
                </Button>
                <Button variant="outline" size="icon"><ShuffleIcon className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon"><MoreHorizontalIcon className="h-5 w-5" /></Button>
            </div>
          </div>
          
          <div className="p-4 md:p-6 lg:p-8">
            <div className="space-y-1">
              {playlist.songs.map((song, index) => (
                <SongListItem
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  album={song.album}
                  duration={song.duration}
                  imageUrl={song.imageUrl}
                  onPlayClick={(id) => console.log('Play song from playlist:', id)}
                  // Add other props as needed
                />
              ))}
            </div>
          </div>
        </ScrollArea>
        
        <PlaybackControlsBar {...commonPlaybackProps} />
      </div>
    </div>
  );
};

export default PlaylistViewPage;