import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AppState {
  /** Desktop/tablet sidebar collapsed to icon rail. Persisted. */
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebarCollapsed: () => void;
  /** Mobile drawer visibility. Not persisted. */
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        sidebarCollapsed: false,
        setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
        toggleSidebarCollapsed: () =>
          set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
        mobileNavOpen: false,
        setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
      }),
      {
        name: "app-store",
        partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
      }
    ),
    { name: "AppStore" }
  )
);
