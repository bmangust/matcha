import { createSlice } from "@reduxjs/toolkit";
import { api } from "../axios";
import { addAge, loadImages, prepareUsers } from "../utils";
import { resetGeneralState } from "./generalSlice";
import { resetUIState } from "./UISlice";

const initialUsersState = {
  isLoading: false,
  isUpdating: false,
  error: null,
  users: [],
  strangers: [],
  banned: null,
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
    failLoading(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
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
          Object.keys(user).forEach((key) => {
            if (
              // prevent overwrite socket info - it could be got earlier than http request
              (key === "lastOnline" && user[key] > userInState[key]) ||
              (key === "isOnline" && userInState[key])
            )
              return;
            userInState[key] = user[key];
          });
        } else {
          state.users.push(user);
        }
      });
    },
    setUsersOnline(state, { payload }) {
      const users = [...payload];
      if (!users.length) return;
      users.forEach((user) => {
        const userInState = state.users.find((el) => user.id === el.id);
        if (userInState) {
          userInState.isOnline = user.isOnline;
        }
      });
    },
    sortStrangers(state, { payload }) {
      const { compareFunction } = { ...payload };
      state.strangers.sort(compareFunction);
    },
    /**
     * Run through all passed strangers and updates their info or addes new
     * @param {State} state
     * @param {action} {payload} - users to update
     */
    updateStrangers(state, { payload }) {
      const users = [...payload];
      if (!users.length) return;
      users.forEach((user) => {
        const userInState = state.strangers.find((el) => user.id === el.id);
        if (userInState) {
          Object.keys(user).forEach((key) => {
            userInState[key] = user[key];
          });
        }
      });
    },

    setUsers(state, { payload }) {
      state.users = payload;
    },
    setStrangers(state, { payload }) {
      state.strangers = [...payload];
    },
    setBanned(state, { payload }) {
      state.banned = payload;
    },
    startUpdating(state) {
      state.isUpdating = true;
    },
    successUpdating(state) {
      state.isUpdating = false;
    },
    failUpdating(state, { payload }) {
      state.isUpdating = false;
      state.error = payload;
    },
    resetError(state) {
      state.error = null;
    },
    resetUsersState: () => initialUsersState,
  },
});

const getUserIds = (users) => users.map((user) => user.id);

const getStrangers = async (showNotif, queryParams = {}) => {
  // console.log(queryParams, Object.entries(queryParams));
  const params = Object.entries(queryParams).reduce((acc, [key, value]) => {
    if (key === "tags") {
      if (!value || value.length === 0) return acc;
      const tags = value.reduce((curr, acc) => `${acc},${curr}`);
      acc[key] = tags;
      return acc;
    } else if (key === "age") {
      return { ...acc, minAge: value.minAge, maxAge: value.maxAge };
    } else if (key === "gender") {
      if (value !== "both") acc[key] = value;
      return acc;
    } else {
      // ignore empty values and username (no api endpint)
      if (value !== "" && key !== "username") acc[key] = value;
      return acc;
    }
  }, {});
  try {
    const res = await api.get("strangers", {
      params,
    });
    if (res.data.status) {
      // console.log("[userSlice] starngers", res.data.data);
      return res.data.data || [];
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
export const loadStrangers = (showNotif, queryParams) => async (
  dispatch,
  getState
) => {
  dispatch(startLoading());
  loadBanned(dispatch);
  let strangers = await getStrangers(showNotif, queryParams);
  if (!strangers) {
    dispatch(resetGeneralState());
    dispatch(resetUsersState());
    dispatch(resetUIState());
    return;
  }

  dispatch(successLoading());
  dispatch(startUpdating());

  strangers = strangers.map((stranger) => addAge(stranger));
  // console.log(strangers);
  dispatch(setStrangers(strangers));
  dispatch(addUsers(strangers));
  // console.log(strangers);

  // load only those, who was not loaded before
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
  getUserIds(preparedStrangers).forEach((el) => loadedIds.add(el));
  // console.log(loadedIds);
  dispatch(setStrangers(preparedStrangers));

  dispatch(successUpdating());
};

/**
 * Recieves arrays of strings, loads only uncashed ones
 * @param {Array<string>} users
 */
export const loadUsers = (users) => async (dispatch) => {
  if (!users) return;
  const notYetLoaded = [...users].filter((id) => !loadedIds.has(id));
  // console.log(notYetLoaded, loadedIds);

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
    if (!preparedUsers.length) return;
    // console.log("loadedUsers", loadedUsers);
    getUserIds(preparedUsers).forEach((el) => loadedIds.add(el));
    // console.log(loadedIds);
    dispatch(updateUsers(preparedUsers));
  } catch (e) {
    console.log(e);
    throw new Error("Fetching users failed");
  }
};

const loadBanned = async (dispatch) => {
  try {
    const res = await api("ban");
    if (res.data.status) {
      const data = res.data.data || [];
      dispatch(loadUsers(data));
      dispatch(setBanned(data));
    }
  } catch (e) {}
};

export const {
  startLoading,
  successLoading,
  addUsers,
  setUsers,
  setBanned,
  updateUsers,
  setUsersOnline,
  sortStrangers,
  setStrangers,
  failLoading,
  startUpdating,
  successUpdating,
  failUpdating,
  resetError,
  resetUsersState,
} = usersSlice.actions;

export default usersSlice.reducer;
