import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: "forest",
  setTheme: (theme) => set({theme}),
}))