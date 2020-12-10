import { createSlice } from "@reduxjs/toolkit";
import { CancelToken, api } from "../axios";
import { addAge, loadImages, prepareUsers } from "../utils";
import { resetGeneralState } from "./generalSlice";
import { resetUIState } from "./UISlice";

const initialUsersState = {
  isLoading: false,
  error: null,
  users: [],
  strangers: [],
};

const loadedIds = new Set();

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
    /**
     * Adds all users, filters already added users by id
     * @param {State} state
     * @param {action} {payload} - users to add
     */
    addUsers(state, { payload }) {
      const users = [...payload];
      if (!users.length) return;
      users.forEach((user) => {
        if (
          Object.keys(user).length !== 0 &&
          !state.users.find((el) => el.id === user.id)
        ) {
          state.users.push(user);
        }
      });
    },
    /**
     * Run through all passed users and updates their info or addes new
     * @param {State} state
     * @param {action} {payload} - users to update
     */
    updateUsers(state, { payload }) {
      const users = [...payload];
      if (!users.length) return;
      users.forEach((user) => {
        const userInState = state.users.find((el) => user.id === el.id);
        if (userInState) {
          Object.keys(userInState).forEach(
            (key) => (userInState[key] = user[key])
          );
        } else {
          state.users.push(user);
        }
      });
    },
    sortStrangers(state, { payload }) {
      const { compareFunction } = { ...payload };
      state.strangers.sort(compareFunction);
    },
    setUsers(state, { payload }) {
      state.users = payload;
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

const getUserIds = (users) => users.map((user) => user.id);

const getStrangers = async (showNotif) => {
  try {
    const res = await api.get("strangers", { cancelToken: source.token });
    if (res.data.status) {
      // console.log("[userSlice] starngers", res.data.data);
      return res.data.data;
    } else {
      showNotif(res.data.data, "error");
      if (res.data.data === "incorrect session id") {
        return null;
      }
    }
  } catch (e) {
    showNotif("Server error", "error");
    console.log(e);
  }
  return [];
};

/**
 * Returns array of users not yet stored in redux
 * @param {Array<user>} users all users for loading
 */
const getUncashedUsers = (users) => {
  if (loadedIds.length === 0) return users;
  const uncashed = users.filter((user) => !loadedIds.has(user.id));
  // console.log(uncashed);
  return uncashed;
};

/**
 * Loads all strangers and saves to store
 * @param {function} showNotif cunsom hook to show notification
 */
export const loadStrangers = (showNotif) => async (dispatch, getState) => {
  dispatch(startLoading());
  let strangers = await getStrangers(showNotif);
  if (!strangers) {
    dispatch(resetGeneralState());
    dispatch(resetUsersState());
    dispatch(resetUIState());
    return;
  }
  strangers = strangers.map((stranger) => addAge(stranger));
  // console.log(strangers);
  dispatch(setStrangers(strangers));
  dispatch(addUsers(strangers));
  // console.log(strangers);

  // load unly those, who was not loaded before
  const uncashed = getUncashedUsers(strangers);
  let preparedUsers = await Promise.all(prepareUsers(uncashed));
  // console.log(preparedUsers);
  dispatch(updateUsers(preparedUsers));

  // map fetched strangers to those we've already prepared
  const allUsers = getState().users.users;
  // console.log(allUsers);
  const preparedStrangers = strangers
    .map((user) => allUsers.find((u) => u.id === user.id))
    .filter((el) => el !== null);
  // console.log(preparedStrangers);
  loadedIds.add(getUserIds(preparedStrangers));
  // console.log(loadedIds);
  dispatch(setStrangers(preparedStrangers));

  dispatch(successLoading());
};

/**
 * Recieves Set of strings, loads only uncashed ones
 * @param {Set<string>} users
 */
export const loadUsers = (users) => async (dispatch, getState) => {
  if (!users) return;
  const notYetLoaded = [...users].filter((id) => !loadedIds.has(id));
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
    loadedIds.add(getUserIds(preparedUsers));
    // console.log(loadedIds);
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
  setUsers,
  updateUsers,
  sortStrangers,
  setStrangers,
  failLoading,
  resetError,
  resetUsersState,
} = usersSlice.actions;

export default usersSlice.reducer;
