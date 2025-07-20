import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamify-theme") || "Dracula",
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    set({ theme });
  },
}));