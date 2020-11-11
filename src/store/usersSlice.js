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
      console.log(payload);
      if (!payload.length) return;
      const users = payload;
      users.forEach((user) => {
        if (!state.users.find((el) => el.id === user.id)) {
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

const getStrangers = async () => {
  try {
    const res = await api.get("strangers", { cancelToken: source.token });
    if (res.data.status && res.data.data) {
      console.log("[userSlice] starngers", res.data.data);
      return res.data.data;
    } else {
    }
  } catch (e) {
    console.log(e);
  }
  return [];
};

const getUncashedUsers = (users, getState) => {
  const allUsers = getState().users.users;
  console.log("[getUncashedUsers] filter", users);
  const uncashed = users.filter((user) => {
    console.log(user);
    const found = allUsers.find((el) => el.id === user.id);
    return found;
  });
  console.log(uncashed);
  return uncashed;
};

export const loadStrangers = (enqueueSnackbar) => async (
  dispatch,
  getState
) => {
  console.log("Started loadStrangers");
  dispatch(startLoading());
  const strangers = await getStrangers(enqueueSnackbar);
  dispatch(setStrangers(strangers));

  const uncashed = getUncashedUsers(strangers, getState);
  if (uncashed.length > 0) {
    dispatch(addUsers(prepareUsers(uncashed)));
  } else {
    dispatch(addUsers(prepareUsers(strangers)));
  }
  dispatch(successLoading());
};

export const loadUsers = (users, full = true) => async (dispatch, getState) => {
  const loadedUsers = getState().users.users;
  // console.log("loadedUsers", loadedUsers);
  if (!users) return;
  dispatch(startLoading());
  // filter already loaded users
  const notYetLoaded = [...users].filter(
    (user) => !loadedUsers.find((el) => el.id === user.id)
  );
  try {
    const promises = notYetLoaded.map((el) =>
      api(`/data/${el}`, { params: { full } })
    );
    const resolvedPromises = await Promise.allSettled(promises);
    // console.log(resolvedPromises);
    const userPromises = resolvedPromises
      .filter((el) => el.status === "fulfilled")
      .map(async (el) => {
        const user = await loadImages(el.value.data.data);
        // console.log("updated user: ", user);
        return user;
      });
    const loadedUsers = await Promise.all(userPromises);
    const preparedUsers = loadedUsers.map((user) => addAge(user));
    // console.log("loadedUsers", loadedUsers);
    dispatch(successLoading());
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
