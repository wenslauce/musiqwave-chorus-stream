
const DEEZER_API = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://api.deezer.com");
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
  nb_fan?: number;
  nb_tracks?: number;
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

export interface DeezerPlaylist {
  id: string;
  title: string;
  description: string;
  picture_medium: string;
  nb_tracks: number;
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
  if (!query) return [];
  
  try {
    const res = await fetch(`${DEEZER_API}/search?q=${encodeURIComponent(query)}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Deezer API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error searching Deezer:", error);
    throw new Error("Failed to search music. Please try again later.");
  }
};

export const getArtist = async (id: string): Promise<DeezerArtist | null> => {
  try {
    const res = await fetch(`${DEEZER_API}/artist/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch artist: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching artist:", error);
    throw new Error("Failed to load artist information. Please try again later.");
  }
};

export const getAlbum = async (id: string): Promise<DeezerAlbum | null> => {
  try {
    const res = await fetch(`${DEEZER_API}/album/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch album: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching album:", error);
    throw new Error("Failed to load album information. Please try again later.");
  }
};

export const getPlaylist = async (id: string): Promise<DeezerPlaylist | null> => {
  try {
    const res = await fetch(`${DEEZER_API}/playlist/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch playlist: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching playlist:", error);
    throw new Error("Failed to load playlist information. Please try again later.");
  }
};

export const getJioSaavnSong = async (query: string): Promise<string | null> => {
  try {
    const res = await fetch(`${JIOSAAVN_API}/search?query=${encodeURIComponent(query)}`);
    
    if (!res.ok) {
      throw new Error(`JioSaavn API error: ${res.status}`);
    }

    const data = await res.json();
    return data.data.songs.results[0]?.url || null;
  } catch (error) {
    console.error("Error fetching JioSaavn song:", error);
    throw new Error("Failed to load song. Please try again later.");
  }
};
