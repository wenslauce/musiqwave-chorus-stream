
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const Search = () => {
  const [query, setQuery] = useState("");

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query) return null;
      // This would be replaced with actual API call
      return {
        tracks: [
          {
            id: 1,
            title: "Sample Track",
            artist: "Sample Artist",
            imageUrl: "/placeholder.svg",
          },
        ],
      };
    },
    enabled: Boolean(query),
  });

  return (
    <div className="animate-fade-in">
      <div className="relative mb-8">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-music-subtext" />
        <Input
          type="text"
          placeholder="Search for songs, artists, or albums"
          className="pl-10 bg-music-light text-music-text border-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-music-light rounded-lg mb-4" />
          ))}
        </div>
      ) : searchResults?.tracks ? (
        <div className="space-y-4">
          {searchResults.tracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-4 music-card"
            >
              <img
                src={track.imageUrl}
                alt={track.title}
                className="w-12 h-12 rounded-md"
              />
              <div>
                <h3 className="font-medium">{track.title}</h3>
                <p className="text-sm text-music-subtext">{track.artist}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
