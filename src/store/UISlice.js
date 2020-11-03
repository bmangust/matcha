import { createSlice } from "@reduxjs/toolkit";
import { api } from "../axios";
import { capitalize } from "../utils";

const initialUIState = {
  showBackButton: false,
  header: null,
  selectedTab: null,
  companion: null,
  isInfoMissing: false,
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
      state.companion = null;
    },
    setHeader(state, { payload }) {
      state.header = payload.header;
    },
    resetUIState: () => initialUIState,
    setCompanion(state, { payload }) {
      state.companion = payload.companion;
    },
    setIsInfoMissing(state, { payload }) {
      state.isInfoMissing = payload;
    },
  },
});

export const {
  showBackButton,
  hideBackButton,
  setSelectedTab,
  setHeader,
  resetUIState,
  setCompanion,
  setIsInfoMissing,
} = UISlice.actions;

export const handleBack = (history, parent) => (dispatch) => {
  dispatch(hideBackButton());
  const header = capitalize(parent);
  dispatch(setHeader({ header }));
  dispatch(setCompanion({ companion: null }));
  parent === "strangers" ? history.push("/") : history.push(`/${parent}`);
};

export const sendVisit = (watchedId) => async (dispatch) => {
  const res = await api.post(`/look`, { id: watchedId });
  console.log(res);
};

export const sendLike = (watchedId) => async (dispatch) => {
  const res = await api.post(`/like`, { id: watchedId });
  console.log(res);
};

export default UISlice.reducer;
