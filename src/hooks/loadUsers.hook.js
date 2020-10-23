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
      throw new Error();
  }
};

export const useFetchUsers = () => {
  const [state, dispatch] = useReducer(fetchUsersReducer, {
    isLoading: false,
    error: null,
    fetchedUsers: [],
  });

  const fetchImage = async (img) => {
    if (img === null) return null;
    try {
      const fetchedImage = await media(img);
      return URL.createObjectURL(fetchedImage.data);
    } catch (error) {
      return null;
    }
  };

  const fetchAvatar = async (user) => {
    const avatarId = user.avatar || (user.images && user.images[0]);
    const avatar = await fetchImage(avatarId);
    return avatar;
  };

  const fetchUsers = useCallback((users) => {
    if (!users) return;
    dispatch({ type: actionTypes.INIT_LOADING });
    try {
      const promises = [...users].map((el) => api.get(`/data/${el}`));
      Promise.allSettled(promises)
        .then((values) =>
          values
            .filter((el) => el.status === "fulfilled")
            .map(async (el) => {
              const user = el.value.data.data;
              const avatar = await fetchAvatar(user);
              user.avatar = avatar;
              return user;
            })
        )
        .then(async (fetchedUsers) => {
          const users = await Promise.all(fetchedUsers);
          dispatch({
            type: actionTypes.SUCCESS_LOADING,
            payload: users,
          });
        });
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
