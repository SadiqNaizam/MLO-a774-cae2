import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import BrowsePage from "./pages/BrowsePage";
import LibraryPage from "./pages/LibraryPage";
import PlaylistViewPage from "./pages/PlaylistViewPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/playlist/:id" element={<PlaylistViewPage />} /> {/* Dynamic route for specific playlists */}
          <Route path="/search" element={<SearchResultsPage />} /> {/* Route for search results, query params will handle specifics */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;