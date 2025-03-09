import { Howl } from 'howler';
import { create } from 'zustand';

type Sound = 'white-noise' | 'rain' | 'notification';

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

export const useAudio = create<AudioState>((set, get) => ({
  sounds: {
    'white-noise': null,
    'rain': null,
    'notification': null
  },
  currentSound: null,
  volume: 0.5,
  isPlaying: false,

  initSound: (sound) => {
    const urls = {
      'white-noise': 'https://cdn.example.com/white-noise.mp3',
      'rain': 'https://cdn.example.com/rain.mp3',
      'notification': 'https://cdn.example.com/notification.mp3'
    };

    const howl = new Howl({
      src: [urls[sound]],
      loop: sound !== 'notification',
      volume: get().volume
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
