import { Howl } from 'howler';
import { create } from 'zustand';

type Sound = 'white-noise' | 'rain' | 'cafe' | 'forest' | 'lofi' | 'notification';

interface AudioState {
  sounds: Record<Sound, Howl | null>;
  currentSound: Sound | null;
  volume: number;
  isPlaying: boolean;

  initSound: (sound: Sound) => void;
  playSound: (sound: Sound) => void;
  stopSound: () => void;
  setVolume: (volume: number) => void;
}

// Free-to-use ambient sound URLs (replace with actual URLs in production)
const SOUND_URLS: Record<Sound, string> = {
  'white-noise': 'https://cdn.pixabay.com/audio/2022/03/10/audio_1b0809c13c.mp3',
  'rain': 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0c6ff1baf.mp3',
  'cafe': 'https://cdn.pixabay.com/audio/2022/05/16/audio_1b0a2a2974.mp3',
  'forest': 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0c6ff1baf.mp3',
  'lofi': 'https://cdn.pixabay.com/audio/2022/05/16/audio_1b0a2a2974.mp3',
  'notification': 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a6d60d.mp3'
};

export const useAudio = create<AudioState>((set, get) => ({
  sounds: {
    'white-noise': null,
    'rain': null,
    'cafe': null,
    'forest': null,
    'lofi': null,
    'notification': null
  },
  currentSound: null,
  volume: 0.5,
  isPlaying: false,

  initSound: (sound) => {
    const howl = new Howl({
      src: [SOUND_URLS[sound]],
      loop: sound !== 'notification',
      volume: get().volume,
      html5: true, // Enable streaming for better performance
      preload: true // Preload the sound
    });

    set((state) => ({
      sounds: { ...state.sounds, [sound]: howl }
    }));
  },

  playSound: (sound) => {
    const state = get();
    if (state.currentSound) {
      state.sounds[state.currentSound]?.stop();
    }
    state.sounds[sound]?.play();
    set({ currentSound: sound, isPlaying: true });
  },

  stopSound: () => {
    const state = get();
    if (state.currentSound) {
      state.sounds[state.currentSound]?.stop();
    }
    set({ currentSound: null, isPlaying: false });
  },

  setVolume: (volume) => {
    const state = get();
    if (state.currentSound) {
      state.sounds[state.currentSound]?.volume(volume);
    }
    set({ volume });
  }
}));