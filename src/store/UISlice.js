import { createSlice } from "@reduxjs/toolkit";
import { api } from "../axios";
import { capitalize } from "../utils";

const initialUIState = {
  showBackButton: false,
  header: null,
  selectedTab: null,
  companion: null,
  isInfoMissing: false,
  parent: "/",
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
    setParent(state, { payload }) {
      state.parent = payload.parent;
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
  setParent,
} = UISlice.actions;

export const handleBack = (history, parent) => (dispatch, useState) => {
  dispatch(hideBackButton());
  const header = capitalize(parent);
  dispatch(setHeader({ header }));
  dispatch(setCompanion({ companion: null }));
  const backLocation = useState().UI.parent;
  backLocation === "strangers"
    ? history.push("/")
    : history.push(`/${backLocation}`);
};

export const sendVisit = (watchedId) => async (dispatch) => {
  const res = await api.post(`/look`, { id: watchedId });
  // console.log(res);
};

export const sendLike = (watchedId) => async (dispatch) => {
  const res = await api.post(`/like`, { id: watchedId });
  // console.log(res);
};

export default UISlice.reducer;
