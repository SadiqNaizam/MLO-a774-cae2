import React from 'react';
import DoraemonLogoComponent from '@/components/DoraemonLogoComponent';
import Sidebar from '@/components/layout/Sidebar';
import AlbumCard from '@/components/AlbumCard';
import SongListItem from '@/components/SongListItem';
import PlaybackControlsBar from '@/components/PlaybackControlsBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';

const libraryPlaylists = [
  { id: 'libPl1', title: 'My Awesome Mix Vol. 1', artist: 'You', imageUrl: 'https://picsum.photos/seed/myplaylist1/300/300', type: 'playlist' as 'playlist' | 'album' },
  { id: 'libPl2', title: 'Road Trip Jams', artist: 'You', imageUrl: 'https://picsum.photos/seed/myplaylist2/300/300', type: 'playlist' as 'playlist' | 'album' },
];
const libraryAlbums = [
  { id: 'libAlb1', title: 'Doraemon The Movie OST', artist: 'Various Artists', imageUrl: 'https://picsum.photos/seed/doraost/300/300', type: 'album' as 'playlist' | 'album' },
];
const librarySongs = [
  { id: 'libSong1', title: 'Yume o Kanaete Doraemon', artist: 'MAO', duration: '3:45', imageUrl: 'https://picsum.photos/seed/yumeokanaete/100/100', isLiked: true },
  { id: 'libSong2', title: 'Aoi Sora wa Pocket sa', artist: 'Kumiko Osugi', duration: '2:50', imageUrl: 'https://picsum.photos/seed/aoisora/100/100', isLiked: true },
];

const commonPlaybackProps = {
  isPlaying: true,
  progressPercent: 75,
  volumePercent: 40,
  onPlayPauseClick: () => console.log('LibraryPage: Play/Pause clicked'),
  onNextClick: () => console.log('LibraryPage: Next clicked'),
  onPreviousClick: () => console.log('LibraryPage: Previous clicked'),
  onSeek: (value: number[]) => console.log('LibraryPage: Seek to', value[0]),
  onVolumeChange: (value: number[]) => console.log('LibraryPage: Volume to', value[0]),
  currentSong: {
    id: 'libSong1',
    title: 'Yume o Kanaete Doraemon',
    artist: 'MAO',
    imageUrl: 'https://picsum.photos/seed/yumeokanaete/100/100',
    durationSeconds: 225,
  }
};

const LibraryPage: React.FC = () => {
  console.log('LibraryPage loaded');

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar className="h-full fixed lg:static w-64 hidden lg:block" />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64">
        <header className="p-4 border-b flex items-center justify-between shrink-0 sticky top-0 bg-background z-10">
           <div className="flex items-center gap-4">
             <DoraemonLogoComponent width={40} />
             <Input placeholder="Filter in Library..." className="w-full max-w-xs hidden md:block" />
           </div>
           <NavigationMenu className="hidden md:block">
             <NavigationMenuList>
                <NavigationMenuItem>
                    <Button variant="ghost">Create Playlist</Button>
                </NavigationMenuItem>
             </NavigationMenuList>
           </NavigationMenu>
           <Button variant="outline" className="md:hidden">Options</Button>
        </header>

        <ScrollArea className="flex-1 p-4 md:p-6 lg:p-8 pb-28">
          <h1 className="text-3xl font-bold mb-6">Your Library</h1>
          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="songs">Liked Songs</TabsTrigger>
              <TabsTrigger value="albums">Albums</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
            </TabsList>
            <TabsContent value="playlists">
              <div className="flex justify-end mb-4">
                <Button>New Playlist</Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {libraryPlaylists.map(album => (
                  <AlbumCard key={album.id} {...album} onClick={(id) => console.log('Clicked library playlist:', id)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="songs">
              <div className="space-y-2">
                {librarySongs.map(song => (
                  <SongListItem
                    key={song.id}
                    {...song}
                    onPlayClick={(id) => console.log('Play liked song:', id)}
                    onLikeClick={(id) => console.log('Unlike song:', id)} // Assuming this toggles like
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {libraryAlbums.map(album => (
                  <AlbumCard key={album.id} {...album} onClick={(id) => console.log('Clicked library album:', id)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="artists">
              <p className="text-muted-foreground">Artists you follow will appear here. (Placeholder)</p>
               {/* Example: Could use simple cards for artists */}
            </TabsContent>
          </Tabs>
        </ScrollArea>
        
        <PlaybackControlsBar {...commonPlaybackProps} />
      </div>
    </div>
  );
};

export default LibraryPage;