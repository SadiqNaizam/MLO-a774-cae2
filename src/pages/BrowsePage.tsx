import React from 'react';
import DoraemonLogoComponent from '@/components/DoraemonLogoComponent';
import Sidebar from '@/components/layout/Sidebar';
import AlbumCard from '@/components/AlbumCard';
import PlaybackControlsBar from '@/components/PlaybackControlsBar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const browseCategories = [
  { title: 'New Releases', items: [
    { id: 'nr1', title: 'Gadget Grooves Vol. 2', artist: 'DJ Bell', imageUrl: 'https://picsum.photos/seed/newrelease1/300/300', type: 'album' as 'playlist' | 'album' },
    { id: 'nr2', title: 'Anywhere Door Anthems', artist: 'The Explorers', imageUrl: 'https://picsum.photos/seed/newrelease2/300/300', type: 'album' as 'playlist' | 'album' },
  ]},
  { title: 'Top Charts', items: [
    { id: 'tc1', title: 'Doraemon\'s Top 50', artist: 'Chart Hits', imageUrl: 'https://picsum.photos/seed/topchart1/300/300', type: 'playlist' as 'playlist' | 'album' },
  ]},
  { title: 'Genres', items: [ // Representing genres as clickable cards or playlists
    { id: 'genre1', title: 'Pop', artist: 'Explore Pop', imageUrl: 'https://picsum.photos/seed/genrepop/300/300', type: 'playlist' as 'playlist' | 'album' },
    { id: 'genre2', title: 'Electronic', artist: 'Explore Electronic', imageUrl: 'https://picsum.photos/seed/genreelectronic/300/300', type: 'playlist' as 'playlist' | 'album' },
    { id: 'genre3', title: 'Kids Music', artist: 'Fun for All', imageUrl: 'https://picsum.photos/seed/genrekids/300/300', type: 'playlist' as 'playlist' | 'album' },
  ]},
];

const commonPlaybackProps = {
  isPlaying: false,
  progressPercent: 0,
  volumePercent: 50,
  onPlayPauseClick: () => console.log('BrowsePage: Play/Pause clicked'),
  onNextClick: () => console.log('BrowsePage: Next clicked'),
  onPreviousClick: () => console.log('BrowsePage: Previous clicked'),
  onSeek: (value: number[]) => console.log('BrowsePage: Seek to', value[0]),
  onVolumeChange: (value: number[]) => console.log('BrowsePage: Volume to', value[0]),
  currentSong: {
    id: 'placeholder-song',
    title: 'No Song Playing',
    artist: 'Select a song',
    imageUrl: 'https://via.placeholder.com/100x100.png?text=Album+Art',
    durationSeconds: 0,
  }
};

const BrowsePage: React.FC = () => {
  console.log('BrowsePage loaded');

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar className="h-full fixed lg:static w-64 hidden lg:block" />
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64">
        <header className="p-4 border-b flex items-center justify-between shrink-0 sticky top-0 bg-background z-10">
          <div className="flex items-center gap-4">
            <DoraemonLogoComponent width={40} />
            <Input placeholder="Search within Browse..." className="w-full max-w-xs hidden md:block" />
          </div>
           <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/genres">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Genres</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link to="/charts">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Charts</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant="ghost" className="md:hidden">Filter</Button>
        </header>

        <ScrollArea className="flex-1 p-4 md:p-6 lg:p-8 pb-28">
          <h1 className="text-3xl font-bold mb-6">Browse Music</h1>
          {browseCategories.map(category => (
            <section key={category.title} className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">{category.title}</h2>
                <Button variant="link" className="text-sm">View All</Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.items.map(item => (
                  <AlbumCard key={item.id} {...item} onClick={(id) => console.log(`Clicked ${category.title} item:`, id)} />
                ))}
              </div>
            </section>
          ))}
           <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Explore Moods</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <Card className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
                    <CardHeader><CardTitle>Focus</CardTitle></CardHeader>
                    <CardContent><p>Music to help you concentrate.</p></CardContent>
                </Card>
                <Card className="bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer">
                    <CardHeader><CardTitle>Happy</CardTitle></CardHeader>
                    <CardContent><p>Uplifting tunes for a good day.</p></CardContent>
                </Card>
                <Card className="bg-red-500 text-white hover:bg-red-600 cursor-pointer">
                    <CardHeader><CardTitle>Workout</CardTitle></CardHeader>
                    <CardContent><p>Energy boosting tracks.</p></CardContent>
                </Card>
             </div>
           </section>
        </ScrollArea>
        
        <PlaybackControlsBar {...commonPlaybackProps} />
      </div>
    </div>
  );
};

export default BrowsePage;