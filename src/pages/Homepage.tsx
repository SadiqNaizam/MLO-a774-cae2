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
import { Link } from 'react-router-dom';

const placeholderAlbums = [
  { id: 'album1', title: 'Dora\'s Adventure Mix', artist: 'Various Artists', imageUrl: 'https://picsum.photos/seed/doraemon1/300/300', type: 'playlist' as 'playlist' | 'album' },
  { id: 'album2', title: 'Nobita\'s Study Beats', artist: 'Lofi Hip Hop', imageUrl: 'https://picsum.photos/seed/nobita2/300/300', type: 'playlist' as 'playlist' | 'album' },
  { id: 'album3', title: 'Shizuka\'s Piano Classics', artist: 'Classical Masters', imageUrl: 'https://picsum.photos/seed/shizuka3/300/300', type: 'album' as 'playlist' | 'album' },
  { id: 'album4', title: 'Gian\'s Power Anthems', artist: 'Rock Stars', imageUrl: 'https://picsum.photos/seed/gian4/300/300', type: 'album' as 'playlist' | 'album' },
];

const placeholderSongs = [
  { id: 'song1', title: 'Doraemon no Uta', artist: 'Kumiko Osugi', duration: '3:12', imageUrl: 'https://picsum.photos/seed/doraemonsong/100/100', isLiked: true },
  { id: 'song2', title: 'Future Gadget Groove', artist: 'DJ Bell', duration: '4:05', imageUrl: 'https://picsum.photos/seed/gadgetgroove/100/100' },
  { id: 'song3', title: 'Time Machine Trip-Hop', artist: 'MC Pocket', duration: '2:55', imageUrl: 'https://picsum.photos/seed/timemachine/100/100' },
];

const commonPlaybackProps = {
  isPlaying: false,
  progressPercent: 25,
  volumePercent: 60,
  onPlayPauseClick: () => console.log('Homepage: Play/Pause clicked'),
  onNextClick: () => console.log('Homepage: Next clicked'),
  onPreviousClick: () => console.log('Homepage: Previous clicked'),
  onSeek: (value: number[]) => console.log('Homepage: Seek to', value[0]),
  onVolumeChange: (value: number[]) => console.log('Homepage: Volume to', value[0]),
  currentSong: {
    id: 'song1',
    title: 'Doraemon no Uta',
    artist: 'Kumiko Osugi',
    imageUrl: 'https://picsum.photos/seed/doraemonsong/100/100',
    durationSeconds: 192,
  }
};

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar className="h-full fixed lg:static w-64 hidden lg:block" />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64"> {/* Adjust margin if sidebar is fixed */}
        <header className="p-4 border-b flex items-center justify-between shrink-0 sticky top-0 bg-background z-10">
          <div className="flex items-center gap-4">
            <DoraemonLogoComponent width={40} />
            <Input placeholder="Search songs, albums, artists..." className="w-full max-w-xs hidden md:block" />
          </div>
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/profile"> {/* Example link */}
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/settings"> {/* Example link */}
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Settings
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="ghost" className="md:hidden">Menu</Button> {/* Placeholder for mobile menu toggle */}
        </header>

        <ScrollArea className="flex-1 p-4 md:p-6 lg:p-8 pb-28"> {/* Padding bottom for PlaybackControlsBar */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Featured Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {placeholderAlbums.filter(a => a.type === 'playlist').map(album => (
                <AlbumCard key={album.id} {...album} onClick={(id) => console.log('Clicked playlist:', id)} />
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Recommended Albums</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {placeholderAlbums.filter(a => a.type === 'album').map(album => (
                <AlbumCard key={album.id} {...album} onClick={(id) => console.log('Clicked album:', id)} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Popular Songs</h2>
            <div className="space-y-2">
              {placeholderSongs.map(song => (
                <SongListItem
                  key={song.id}
                  {...song}
                  onPlayClick={(id) => console.log('Play song:', id)}
                  onLikeClick={(id) => console.log('Like song:', id)}
                  onAddToPlaylistClick={(id) => console.log('Add to playlist:', id)}
                />
              ))}
            </div>
          </section>
        </ScrollArea>
        
        <PlaybackControlsBar {...commonPlaybackProps} />
      </div>
    </div>
  );
};

export default Homepage;