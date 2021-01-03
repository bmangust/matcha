import { createSlice } from "@reduxjs/toolkit";
import { api } from "../axios";
import { setChat } from "./chatSlice";
import { saveNewState } from "./generalSlice";

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
  const backLocation = useState().UI.parent;
  dispatch(hideBackButton());
  dispatch(setHeader({ header: parent }));
  dispatch(setCompanion({ companion: null }));
  dispatch(setChat(null));
  backLocation === "strangers"
    ? history.push("/")
    : history.push(`/${backLocation}`);
};

export const sendVisit = (id) => (dispatch) => {
  try {
    api.post(`/look`, { id });
  } catch (e) {
    console.log(e);
  }
};

export const sendLike = (id) => (dispatch, getState) => {
  try {
    api.post(`/like`, { id });
    const { likes } = getState().general;
    const newLikes = [...likes, id];
    dispatch(saveNewState({ likes: newLikes }));
  } catch (e) {
    console.log(e);
  }
};

export const removeLike = (id) => (dispatch, getState) => {
  try {
    api.delete(`/like/${id}`);
    const { likes } = getState().general;
    const newLikes = likes.filter((ids) => ids !== id);
    dispatch(saveNewState({ likes: newLikes }));
  } catch (e) {
    console.log(e);
  }
};

export default UISlice.reducer;
