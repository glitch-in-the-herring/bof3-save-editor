import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

interface TabState {
  activeTab: string
  setTab: (tab: string) => void
}

export const useTab = create<TabState>()(
  immer((set) => ({
    activeTab: "meta",
    setTab: (tab) => {
      set({ activeTab: tab })
    },
  })),
)
