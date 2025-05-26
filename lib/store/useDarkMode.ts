import { create } from "zustand";

interface darkModeType {
  enable: boolean;
  setIsEnable: (enable: boolean) => void;
}

const useDarkMode = create<darkModeType>((set) => ({
  enable: false,
  setIsEnable: (enable) => set((state) => ({ enable: enable })),
}));

export default useDarkMode;
