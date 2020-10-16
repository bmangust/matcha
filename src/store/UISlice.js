import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
  showBackButton: false,
  header: null,
  selectedTab: null,
  companion: null,
};

const UISlice = createSlice({
  name: "UI",
  initialState: initialUIState,
  reducers: {
    showBackButton(state) {
      state.showBackButton = true;
    },
    hideBackButton(state) {
      state.showBackButton = false;
    },
    setSelectedTab(state, { payload }) {
      state.selectedTab = payload.selectedTab;
      state.header = payload.selectedTab.label;
    },
    setHeader(state, { payload }) {
      state.header = payload.header;
    },
    // setCompanion(state, { payload }) {
    //   state.companion = payload.companion;
    // },
  },
});

export const {
  showBackButton,
  hideBackButton,
  setSelectedTab,
  setHeader,
  // setCompanion,
} = UISlice.actions;

export const handleBack = (history) => (dispatch) => {
  dispatch(hideBackButton());
  dispatch(setHeader({ header: "Chat" }));
  // dispatch(setCompanion({ companion: null }));
  history.push("/chat");
};

export default UISlice.reducer;
