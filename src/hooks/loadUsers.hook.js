import { useCallback, useReducer } from "react";
import PropTypes from "prop-types";
import { api, media } from "../axios";

const actionTypes = {
  INIT_LOADING: "INIT_LOADING",
  SUCCESS_LOADING: "SUCCESS_LOADING",
  FAIL_LOADING: "FAIL_LOADING",
  CLEAR_ERROR: "CLEAR_ERROR",
};

const fetchUsersReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INIT_LOADING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case actionTypes.SUCCESS_LOADING:
      return {
        ...state,
        error: null,
        isLoading: false,
        fetchedUsers: [...action.payload],
      };
    case actionTypes.FAIL_LOADING:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case actionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      throw new Error("Wrong action type in loadUsers hook");
  }
};

const fetchImage = async (img) => {
  if (img === null || img === "") return null;
  try {
    const fetchedImage = await media(`img/${img}`);
    return URL.createObjectURL(fetchedImage.data);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchAvatar = async (user) => {
  const avatarId = user.avatar;
  const avatar = await fetchImage(avatarId);
  return avatar;
};

export const useFetchUsers = () => {
  const [state, dispatch] = useReducer(fetchUsersReducer, {
    isLoading: false,
    error: null,
    fetchedUsers: [],
  });

  const fetchUsers = useCallback((users) => {
    if (!users) return;

    const fetchUsersAsync = async (users) => {
      try {
        const promises = [...users].map((el) => api(`/data/${el}`));
        const resolvedPromises = await Promise.allSettled(promises);
        console.log(resolvedPromises);
        const userPromises = resolvedPromises
          .filter((el) => el.status === "fulfilled")
          .map(async (el) => {
            const user = { ...el.value.data.data };
            const avatar = await fetchAvatar(user);
            user.avatarImg = avatar;
            return user;
          });
        const loadedUsers = await Promise.all(userPromises);
        console.log(loadedUsers);
        dispatch({
          type: actionTypes.SUCCESS_LOADING,
          payload: loadedUsers,
        });
      } catch (e) {
        console.log(e);
        throw new Error("Fetching users failed");
      }
    };

    dispatch({ type: actionTypes.INIT_LOADING });
    try {
      fetchUsersAsync(users);
    } catch (err) {
      console.log(err);
      dispatch({ type: actionTypes.FAIL_LOADING, payload: err });
    }
  }, []);

  fetchUsers.propTypes = {
    users: PropTypes.arrayOf(PropTypes.string),
  };

  const clearError = () => dispatch({ type: actionTypes.CLEAR_ERROR });

  return [state, fetchUsers, clearError];
};
