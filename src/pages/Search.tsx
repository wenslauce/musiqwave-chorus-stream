
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchDeezer, type DeezerSearchResult } from "@/lib/api";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchDeezer(query),
    enabled: Boolean(query),
  });

  const renderResultItem = (result: DeezerSearchResult) => {
    const imageUrl = result.album?.cover_medium || result.artist?.picture_medium || "/placeholder.svg";
    let linkPath = "";
    let subtitle = "";

    switch (result.type) {
      case "track":
        linkPath = `/songs/${result.id}`;
        subtitle = result.artist?.name || "";
        break;
      case "artist":
        linkPath = `/artists/${result.id}`;
        subtitle = `${result.nb_fan || 0} fans`;
        break;
      case "album":
        linkPath = `/albums/${result.id}`;
        subtitle = result.artist?.name || "";
        break;
      case "playlist":
        linkPath = `/playlists/${result.id}`;
        subtitle = `${result.nb_tracks || 0} tracks`;
        break;
    }

    return (
      <Link
        key={result.id}
        to={linkPath}
        className="flex items-center gap-4 p-4 music-card"
      >
        <img
          src={imageUrl}
          alt={result.title}
          className="w-12 h-12 rounded-md object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{result.title}</h3>
          <p className="text-sm text-music-subtext truncate">{subtitle}</p>
        </div>
        <span className="text-sm text-music-subtext capitalize">{result.type}</span>
      </Link>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="relative mb-8">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-music-subtext" />
        <Input
          type="text"
          placeholder="Search for songs, artists, albums, or playlists"
          className="pl-10 bg-music-light text-music-text border-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-music-light rounded-lg" />
          ))}
        </div>
      ) : searchResults?.length ? (
        <div className="space-y-4">
          {searchResults.map(renderResultItem)}
        </div>
      ) : query ? (
        <div className="text-center text-music-subtext">
          <p>No results found</p>
          <p className="mt-2">Try searching for something else</p>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
