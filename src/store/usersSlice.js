import { createSlice } from "@reduxjs/toolkit";
import { CancelToken, api } from "../axios";
import { addAge, loadImages, prepareUsers } from "../utils";

const initialUsersState = {
  isLoading: false,
  error: null,
  users: [],
  strangers: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    successLoading(state) {
      state.isLoading = false;
    },
    addUsers(state, { payload }) {
      // console.log(payload);
      if (!payload.length) return;
      const users = payload;
      users.forEach((user) => {
        if (
          Object.keys(user).length !== 0 &&
          !state.users.find((el) => el.id === user.id)
        ) {
          state.users.push(user);
        }
      });
    },
    setStrangers(state, { payload }) {
      state.strangers = [...payload];
    },
    failLoading(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
    resetError(state) {
      state.error = null;
    },
    resetUsersState: () => initialUsersState,
  },
});

const source = CancelToken.source();

const getStrangers = async (showNotif) => {
  try {
    const res = await api.get("strangers", { cancelToken: source.token });
    if (res.data.status && res.data.data) {
      // console.log("[userSlice] starngers", res.data.data);
      return res.data.data;
    } else {
      showNotif(res.data.data, "error");
    }
  } catch (e) {
    showNotif("Server error", "error");
    console.log(e);
  }
  return [];
};

const getUncashedUsers = (users, getState) => {
  const allUsers = getState().users.users;
  if (allUsers.length === 0) return users;
  // console.log("[getUncashedUsers] filter", users);
  const uncashed = users.filter((user) => {
    // console.log(user);
    const found = allUsers.find((el) => el.id === user.id);
    return found;
  });
  // console.log(uncashed);
  return uncashed;
};

export const loadStrangers = (showNotif) => async (dispatch, getState) => {
  dispatch(startLoading());
  const strangers = await getStrangers(showNotif);
  // console.log(strangers);

  // load unly those, who was not loaded before
  const uncashed = getUncashedUsers(strangers, getState);
  let preparedUsers = await Promise.all(prepareUsers(uncashed));
  dispatch(addUsers(preparedUsers));

  // map fetched strangers to those we've already prepared
  const allUsers = getState().users.users;
  const preparedStrangers = strangers
    .map((user) => allUsers.find((u) => u.id === user.id))
    .filter((el) => el !== null);
  // console.log(preparedStrangers);
  dispatch(setStrangers(preparedStrangers));

  dispatch(successLoading());
};

export const loadUsers = (users) => async (dispatch, getState) => {
  const loadedUsers = getState().users.users;
  // console.log("loadUsers", users, loadedUsers);
  if (!users) return;
  // filter already loaded users
  const notYetLoaded =
    loadedUsers.length > 0
      ? [...users].filter((user) => !loadedUsers.find((el) => el.id === user))
      : [...users];
  // console.log(notYetLoaded);
  try {
    const promises = notYetLoaded.map((el) => api(`/data/${el}`));
    let resolvedPromises = await Promise.allSettled(promises);
    // console.log(resolvedPromises);
    const userPromises = resolvedPromises
      .filter((el) => el.status === "fulfilled")
      .filter((el) => el.value.data.status)
      .map(async (el) => await loadImages(el.value.data.data));
    const loadedUsers = await Promise.all(userPromises);
    // console.log(loadedUsers);
    const preparedUsers = loadedUsers.map((user) => user && addAge(user));
    // console.log("loadedUsers", loadedUsers);
    dispatch(addUsers(preparedUsers));
  } catch (e) {
    console.log(e);
    throw new Error("Fetching users failed");
  }
};

export const {
  startLoading,
  successLoading,
  addUsers,
  setStrangers,
  failLoading,
  resetError,
  resetUsersState,
} = usersSlice.actions;

export default usersSlice.reducer;
