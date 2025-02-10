
import { create } from 'zustand';
import { DeezerSearchResult } from './api';

interface MusicStore {
  currentTrack: DeezerSearchResult | null;
  setCurrentTrack: (track: DeezerSearchResult | null) => void;
}

export const useMusicStore = create<MusicStore>((set) => ({
  currentTrack: null,
  setCurrentTrack: (track) => set({ currentTrack: track }),
}));
