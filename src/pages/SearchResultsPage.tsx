import React from 'react';
import { useLocation } from 'react-router-dom';
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
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // For artist cards

// Placeholder data for search results
const searchResults = {
  songs: [
    { id: 'searchSong1', title: 'Doraemon Theme Remix', artist: 'DJ Future', duration: '3:30', imageUrl: 'https://picsum.photos/seed/searchsong1/100/100' },
    { id: 'searchSong2', title: 'Song About Doraemon', artist: 'FanMade', duration: '2:10', imageUrl: 'https://picsum.photos/seed/searchsong2/100/100' },
  ],
  albums: [
    { id: 'searchAlbum1', title: 'Doraemon Hits Collection', artist: 'Various Artists', imageUrl: 'https://picsum.photos/seed/searchalbum1/300/300', type: 'album' as 'playlist' | 'album' },
  ],
  artists: [
    { id: 'artist1', name: 'Doraemon Voice Cast', description: 'Voice actors from the show', imageUrl: 'https://picsum.photos/seed/artistdora/150/150' },
  ],
  playlists: [
    { id: 'searchPl1', title: 'Best of Doraemon Soundtracks', artist: 'Community Playlist', imageUrl: 'https://picsum.photos/seed/searchpl1/300/300', type: 'playlist' as 'playlist' | 'album' },
  ]
};

const commonPlaybackProps = {
  isPlaying: false,
  progressPercent: 0,
  volumePercent: 50,
  onPlayPauseClick: () => console.log('SearchResultsPage: Play/Pause clicked'),
  onNextClick: () => console.log('SearchResultsPage: Next clicked'),
  onPreviousClick: () => console.log('SearchResultsPage: Previous clicked'),
  onSeek: (value: number[]) => console.log('SearchResultsPage: Seek to', value[0]),
  onVolumeChange: (value: number[]) => console.log('SearchResultsPage: Volume to', value[0]),
  currentSong: {
    id: 'placeholder-song',
    title: 'No Song Playing',
    artist: 'Select a song',
    imageUrl: 'https://via.placeholder.com/100x100.png?text=Album+Art',
    durationSeconds: 0,
  }
};

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || "Doraemon"; // Get search query from URL
  console.log('SearchResultsPage loaded for query:', query);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar className="h-full fixed lg:static w-64 hidden lg:block" />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64">
        <header className="p-4 border-b flex items-center justify-between shrink-0 sticky top-0 bg-background z-10">
          <div className="flex items-center gap-4">
            <DoraemonLogoComponent width={40} />
            <Input placeholder="Search again..." defaultValue={query || ""} className="w-full max-w-md" />
          </div>
          <NavigationMenu className="hidden md:block">
            {/* Potentially filters or sorting options */}
          </NavigationMenu>
        </header>

        <ScrollArea className="flex-1 p-4 md:p-6 lg:p-8 pb-28">
          <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
          <Tabs defaultValue="songs" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="songs">Songs ({searchResults.songs.length})</TabsTrigger>
              <TabsTrigger value="albums">Albums ({searchResults.albums.length})</TabsTrigger>
              <TabsTrigger value="artists">Artists ({searchResults.artists.length})</TabsTrigger>
              <TabsTrigger value="playlists">Playlists ({searchResults.playlists.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="songs">
              <div className="space-y-2">
                {searchResults.songs.map(song => (
                  <SongListItem key={song.id} {...song} onPlayClick={(id) => console.log('Play search song:', id)} />
                ))}
                {searchResults.songs.length === 0 && <p className="text-muted-foreground">No songs found matching your query.</p>}
              </div>
            </TabsContent>

            <TabsContent value="albums">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResults.albums.map(album => (
                  <AlbumCard key={album.id} {...album} onClick={(id) => console.log('Clicked search album:', id)} />
                ))}
              </div>
              {searchResults.albums.length === 0 && <p className="text-muted-foreground">No albums found matching your query.</p>}
            </TabsContent>

            <TabsContent value="artists">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.artists.map(artist => (
                  <Card key={artist.id} className="cursor-pointer hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={artist.imageUrl} alt={artist.name} />
                        <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{artist.name}</CardTitle>
                        <CardDescription>{artist.description}</CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
              {searchResults.artists.length === 0 && <p className="text-muted-foreground">No artists found matching your query.</p>}
            </TabsContent>

            <TabsContent value="playlists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResults.playlists.map(playlist => (
                  <AlbumCard key={playlist.id} {...playlist} onClick={(id) => console.log('Clicked search playlist:', id)} />
                ))}
              </div>
              {searchResults.playlists.length === 0 && <p className="text-muted-foreground">No playlists found matching your query.</p>}
            </TabsContent>
          </Tabs>
        </ScrollArea>
        
        <PlaybackControlsBar {...commonPlaybackProps} />
      </div>
    </div>
  );
};

export default SearchResultsPage;