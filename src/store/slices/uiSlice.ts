import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  activeWorkspace: string;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  activeWorkspace: "Varuvi Sitemap",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setMobileSidebarOpen(state, action: PayloadAction<boolean>) {
      state.mobileSidebarOpen = action.payload;
    },
    setActiveWorkspace(state, action: PayloadAction<string>) {
      state.activeWorkspace = action.payload;
    },
  },
});

export const { toggleSidebarCollapsed, setMobileSidebarOpen, setActiveWorkspace } =
  uiSlice.actions;
export default uiSlice.reducer;
