
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getArtist, getAlbum, type DeezerArtist, type DeezerAlbum } from "@/lib/api";
import { Disc, Users } from "lucide-react";

const Artist = () => {
  const { id } = useParams<{ id: string }>();

  const { data: artist, isLoading: isLoadingArtist } = useQuery({
    queryKey: ["artist", id],
    queryFn: () => getArtist(id!),
    enabled: !!id,
  });

  if (isLoadingArtist) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-64 bg-music-light rounded-lg" />
        <div className="h-8 w-48 bg-music-light rounded-lg" />
      </div>
    );
  }

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex items-center gap-8">
        <img
          src={artist.picture_medium}
          alt={artist.name}
          className="w-64 h-64 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{artist.name}</h1>
          <div className="flex gap-4 text-music-subtext">
            <div className="flex items-center gap-2">
              <Disc className="w-5 h-5" />
              <span>{artist.nb_album} albums</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>{artist.nb_fan.toLocaleString()} fans</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artist;
