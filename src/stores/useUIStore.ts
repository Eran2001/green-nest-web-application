import { create } from "zustand";

interface UIStore {
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  roomPhoto: string | null;
  setRoomPhoto: (url: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  mobileNavOpen: false,
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  roomPhoto: null,
  setRoomPhoto: (url) => set({ roomPhoto: url }),
}));
