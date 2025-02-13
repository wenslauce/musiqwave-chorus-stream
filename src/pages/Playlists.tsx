
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPlaylist, type DeezerPlaylist } from "@/lib/api";
import { ListMusic } from "lucide-react";
import { useMusicStore } from "@/lib/store";

const Playlists = () => {
  const { id } = useParams<{ id: string }>();
  const setCurrentTrack = useMusicStore((state) => state.setCurrentTrack);

  const { data: playlist, isLoading } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => getPlaylist(id!),
    enabled: !!id,
  });

  if (!id) {
    return (
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">Your Playlists</h1>
        <div className="text-center text-music-subtext">
          <p>No playlists yet</p>
          <p className="mt-2">Create your first playlist to get started</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-64 bg-music-light rounded-lg" />
        <div className="h-8 w-48 bg-music-light rounded-lg" />
      </div>
    );
  }

  if (!playlist) {
    return <div>Playlist not found</div>;
  }

  const handlePlay = (track: any) => {
    setCurrentTrack(track);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center gap-8">
        <img
          src={playlist.picture_medium}
          alt={playlist.title}
          className="w-64 h-64 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{playlist.title}</h1>
          <div className="flex items-center gap-2 text-music-subtext">
            <ListMusic className="w-5 h-5" />
            <span>{playlist.nb_tracks} tracks</span>
          </div>
          {playlist.description && (
            <p className="mt-4 text-music-subtext">{playlist.description}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {playlist.tracks.data.map((track) => (
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

export default Playlists;
