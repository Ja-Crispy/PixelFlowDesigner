import { create } from 'zustand';

interface TimerState {
  time: number;
  isRunning: boolean;
  mode: 'pomodoro' | 'flow' | 'custom';
  duration: number;
  cycles: number;
  currentCycle: number;
  
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setMode: (mode: TimerState['mode'], duration: number) => void;
  tick: () => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  time: 1500, // 25 minutes in seconds
  isRunning: false,
  mode: 'pomodoro',
  duration: 1500,
  cycles: 4,
  currentCycle: 1,

  startTimer: () => set({ isRunning: true }),
  pauseTimer: () => set({ isRunning: false }),
  
  resetTimer: () => set((state) => ({ 
    time: state.duration,
    isRunning: false,
    currentCycle: 1
  })),
  
  setMode: (mode, duration) => set({ 
    mode,
    duration,
    time: duration,
    isRunning: false,
    currentCycle: 1
  }),
  
  tick: () => set((state) => {
    if (state.time <= 0) {
      if (state.currentCycle >= state.cycles) {
        return {
          isRunning: false,
          time: state.duration,
          currentCycle: 1
        };
      }
      return {
        time: state.duration,
        currentCycle: state.currentCycle + 1
      };
    }
    return { time: state.time - 1 };
  })
}));
