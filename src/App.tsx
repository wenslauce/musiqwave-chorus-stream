
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Playlists from "./pages/Playlists";
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import NotFound from "./pages/NotFound";
import { useMusicStore } from "./lib/store";

const queryClient = new QueryClient();

const App = () => {
  const currentTrack = useMusicStore((state) => state.currentTrack);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="ml-64 flex-1 p-8">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/playlists/:id" element={<Playlists />} />
                <Route path="/artists/:id" element={<Artist />} />
                <Route path="/albums/:id" element={<Album />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <MusicPlayer className="ml-64" currentTrack={currentTrack} />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
