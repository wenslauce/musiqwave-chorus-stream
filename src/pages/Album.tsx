
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAlbum, type DeezerAlbum } from "@/lib/api";
import { Calendar } from "lucide-react";
import { useMusicStore } from "@/lib/store";

const Album = () => {
  const { id } = useParams<{ id: string }>();
  const setCurrentTrack = useMusicStore((state) => state.setCurrentTrack);

  const { data: album, isLoading } = useQuery({
    queryKey: ["album", id],
    queryFn: () => getAlbum(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-64 bg-music-light rounded-lg" />
        <div className="h-8 w-48 bg-music-light rounded-lg" />
      </div>
    );
  }

  if (!album) {
    return <div>Album not found</div>;
  }

  const handlePlay = (track: any) => {
    setCurrentTrack(track);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center gap-8">
        <img
          src={album.cover_medium}
          alt={album.title}
          className="w-64 h-64 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{album.title}</h1>
          <div className="flex items-center gap-2 text-music-subtext">
            <Calendar className="w-5 h-5" />
            <span>{new Date(album.release_date).getFullYear()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {album.tracks.data.map((track) => (
          <button
            key={track.id}
            onClick={() => handlePlay(track)}
            className="w-full p-4 text-left hover:bg-music-light rounded-lg transition-colors"
          >
            <h3 className="font-medium">{track.title}</h3>
            {track.artist && (
              <p className="text-sm text-music-subtext">{track.artist.name}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Album;
