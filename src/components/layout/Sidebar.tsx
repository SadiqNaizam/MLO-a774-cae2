import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Home, ListMusic, Search, Library, Radio } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

// Example navigation items, customize as needed
const mainNavItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/browse", label: "Browse", icon: Radio }, // Changed Search to Radio as Browse is often discovery
  { to: "/library", label: "Your Library", icon: Library },
];

const playlists = [ // Example, this would likely come from state/props
    { id: "1", name: "Liked Songs" },
    { id: "2", name: "Dora's Happy Tunes" },
    { id: "3", name: "Chill Vibes" },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  console.log("Rendering Sidebar");
  const location = useLocation();

  return (
    <aside className={cn("w-60 bg-muted/40 border-r border-border h-full flex flex-col", className)}>
      <div className="p-4">
        {/* Optional: Logo or App Name placeholder if not in a global header */}
        {/* <DoraemonLogoComponent width={40} /> */}
        <h2 className="text-lg font-semibold tracking-tight mt-2 mb-1">Discover</h2>
      </div>
      <ScrollArea className="flex-1 px-2">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary hover:text-primary-foreground",
                location.pathname === item.to ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Separator className="my-4" />
        <div className="px-3 py-2">
            <h2 className="mb-2 px-1 text-lg font-semibold tracking-tight">
                Playlists
            </h2>
            <div className="space-y-1">
                 {playlists.map((playlist) => (
                    <Link
                        key={playlist.id}
                        to={`/playlist/${playlist.id}`} // Example playlist route
                        className={cn(
                            "block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                            location.pathname === `/playlist/${playlist.id}` ? "bg-muted text-foreground" : "text-muted-foreground"
                        )}
                    >
                        {playlist.name}
                    </Link>
                 ))}
            </div>
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        {/* Optional: Footer content for sidebar, e.g., settings, user profile quick link */}
        <p className="text-xs text-muted-foreground">© Doraemon Music</p>
      </div>
    </aside>
  );
}

export default Sidebar;