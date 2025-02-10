
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { DeezerSearchResult } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const DEEZER_API = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://api.deezer.com");

interface FeaturedContent {
  playlists: {
    data: Array<{
      id: string;
      title: string;
      picture_medium: string;
      nb_tracks: number;
    }>;
  };
}

const Index = () => {
  const { toast } = useToast();

  const { data: featuredPlaylists, isLoading: isLoadingPlaylists } = useQuery({
    queryKey: ["featuredPlaylists"],
    queryFn: async () => {
      try {
        const res = await fetch(`${DEEZER_API}/editorial/0/charts`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch playlists: ${res.status}`);
        }
        
        const data: FeaturedContent = await res.json();
        return data.playlists?.data || [];
      } catch (error) {
        console.error("Error fetching playlists:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load featured playlists. Please try again later.",
        });
        return [];
      }
    }
  });

  const { data: charts, isLoading: isLoadingCharts } = useQuery({
    queryKey: ["charts"],
    queryFn: async () => {
      try {
        const res = await fetch(`${DEEZER_API}/chart/0/tracks`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch charts: ${res.status}`);
        }
        
        const data = await res.json();
        return data.data || [];
      } catch (error) {
        console.error("Error fetching charts:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load charts. Please try again later.",
        });
        return [];
      }
    }
  });

  const { data: newReleases, isLoading: isLoadingReleases } = useQuery({
    queryKey: ["newReleases"],
    queryFn: async () => {
      try {
        const res = await fetch(`${DEEZER_API}/editorial/0/releases`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch releases: ${res.status}`);
        }
        
        const data = await res.json();
        return data.data || [];
      } catch (error) {
        console.error("Error fetching releases:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load new releases. Please try again later.",
        });
        return [];
      }
    }
  });

  if (isLoadingPlaylists || isLoadingCharts || isLoadingReleases) {
    return (
      <div className="animate-pulse space-y-8">
        {[...Array(3)].map((_, sectionIndex) => (
          <div key={sectionIndex}>
            <div className="h-8 w-48 bg-music-light rounded mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="music-card aspect-square rounded-lg bg-music-light" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-12">
      {/* Featured Playlists */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredPlaylists?.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlists/${playlist.id}`}
              className="music-card hover:bg-music-light transition-colors p-4 rounded-lg"
            >
              <img
                src={playlist.picture_medium || "/placeholder.svg"}
                alt={playlist.title}
                className="w-full aspect-square object-cover rounded-md mb-4"
              />
              <h3 className="font-medium mb-1 truncate">{playlist.title}</h3>
              <p className="text-sm text-music-subtext">{playlist.nb_tracks} tracks</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Charts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {charts?.slice(0, 8).map((track: DeezerSearchResult) => (
            <div
              key={track.id}
              className="music-card hover:bg-music-light transition-colors p-4 rounded-lg"
            >
              <img
                src={track.album?.cover_medium || "/placeholder.svg"}
                alt={track.title}
                className="w-full aspect-square object-cover rounded-md mb-4"
              />
              <h3 className="font-medium mb-1 truncate">{track.title}</h3>
              <p className="text-sm text-music-subtext truncate">{track.artist?.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section>
        <h2 className="text-2xl font-bold mb-6">New Releases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newReleases?.slice(0, 8).map((album: DeezerSearchResult) => (
            <Link
              key={album.id}
              to={`/albums/${album.id}`}
              className="music-card hover:bg-music-light transition-colors p-4 rounded-lg"
            >
              <img
                src={album.album?.cover_medium || "/placeholder.svg"}
                alt={album.title}
                className="w-full aspect-square object-cover rounded-md mb-4"
              />
              <h3 className="font-medium mb-1 truncate">{album.title}</h3>
              <p className="text-sm text-music-subtext truncate">{album.artist?.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
