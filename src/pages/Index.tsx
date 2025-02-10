
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { data: featuredPlaylists, isLoading } = useQuery({
    queryKey: ["featuredPlaylists"],
    queryFn: async () => {
      // This would be replaced with actual API call
      return [
        {
          id: 1,
          title: "Today's Top Hits",
          description: "The biggest hits right now",
          imageUrl: "/placeholder.svg",
        },
        // ... more playlists
      ];
    },
  });

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-music-light rounded mb-8" />
        <div className="grid grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="music-card h-64" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Featured Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredPlaylists?.map((playlist) => (
          <div key={playlist.id} className="music-card">
            <img
              src={playlist.imageUrl}
              alt={playlist.title}
              className="w-full aspect-square object-cover rounded-md mb-4"
            />
            <h3 className="font-medium mb-1">{playlist.title}</h3>
            <p className="text-sm text-music-subtext">{playlist.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
