import { create } from "zustand";

type LocationState = {
  location: string;
  history: string[];
  isSearch: boolean;
};

type LocationAction = {
  updateLocation: (location: string) => void;
  addHistory: (location: string) => void;
  removeHistory: (location: string) => void;
  toggleIsSearch: () => void;
};

const useLocationStore = create<LocationState & LocationAction>((set) => ({
  location: "singapore",
  history: [],
  isSearch: false,
  updateLocation: (location: string) => set(() => ({ location: location })),
  addHistory: (location: string) =>
    set((state) => ({ history: [...state.history, location] })),
  removeHistory: (location: string) =>
    set((state) => ({
      history: state.history.filter((str) => str !== location),
    })),
  toggleIsSearch: () => set((state) => ({ isSearch: !state.isSearch })),
}));

export default useLocationStore;
