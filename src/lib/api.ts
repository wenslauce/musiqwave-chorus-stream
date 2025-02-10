
const DEEZER_API = "https://api.deezer.com";
const JIOSAAVN_API = "https://jiosaavn-sand.vercel.app/api";

export interface DeezerSearchResult {
  id: string;
  title: string;
  type: "track" | "artist" | "album" | "playlist";
  artist?: {
    id: string;
    name: string;
    picture_medium?: string;
  };
  album?: {
    id: string;
    title: string;
    cover_medium: string;
  };
  duration?: number;
  preview?: string;
}

export interface DeezerArtist {
  id: string;
  name: string;
  picture_medium: string;
  nb_album: number;
  nb_fan: number;
  tracklist: string;
}

export interface DeezerAlbum {
  id: string;
  title: string;
  cover_medium: string;
  release_date: string;
  tracks: {
    data: DeezerSearchResult[];
  };
}

export interface JioSaavnSongResult {
  id: string;
  title: string;
  url: string;
}

export const searchDeezer = async (query: string): Promise<DeezerSearchResult[]> => {
  try {
    const res = await fetch(`${DEEZER_API}/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error searching Deezer:", error);
    return [];
  }
};

export const getArtist = async (id: string): Promise<DeezerArtist | null> => {
  try {
    const res = await fetch(`${DEEZER_API}/artist/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching artist:", error);
    return null;
  }
};

export const getAlbum = async (id: string): Promise<DeezerAlbum | null> => {
  try {
    const res = await fetch(`${DEEZER_API}/album/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching album:", error);
    return null;
  }
};

export const getJioSaavnSong = async (query: string): Promise<string | null> => {
  try {
    const res = await fetch(`${JIOSAAVN_API}/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.data.songs.results[0]?.url || null;
  } catch (error) {
    console.error("Error fetching JioSaavn song:", error);
    return null;
  }
};
