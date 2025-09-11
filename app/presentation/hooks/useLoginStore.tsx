import { create } from 'zustand';

export interface LoginState {
  token: string;
  setToken: (token: string) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  token: '',
  setToken: (token: string) => {
    set({ token });
  },
}));