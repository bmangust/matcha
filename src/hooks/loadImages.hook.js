import { useCallback, useReducer } from "react";
import { media, CancelToken } from "../axios";
import PropTypes from "prop-types";
import Axios from "axios";

const actionTypes = {
  INIT_LOADING: "INIT_LOADING",
  SUCCESS_LOADING: "SUCCESS_LOADING",
  FAIL_LOADING: "FAIL_LOADING",
  CLEAR_ERROR: "CLEAR_ERROR",
  UNMOUNT: "UNMOUNT",
  MOUNT: "MOUNT",
};

const fetchImagesReducer = (state, action) => {
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
        fetchedImages: [...action.payload],
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
    case actionTypes.UNMOUNT:
      return {
        ...state,
        isMounted: false,
      };
    case actionTypes.MOUNT:
      return {
        ...state,
        error: true,
      };
    default:
      throw new Error("Wrong action type in loadImages hook");
  }
};

export const useFetchedImages = () => {
  const [state, dispatch] = useReducer(fetchImagesReducer, {
    isLoading: false,
    error: null,
    fetchedImages: [],
    isMounted: true,
  });
  const source = CancelToken.source();

  const fetchImages = useCallback((images) => {
    if (!images) return;

    const fetchImagesAsync = async (images) => {
      // try {
      const promises = images.map((img) =>
        media(`img/${img}`, { cancelToken: source.token })
      );
      const resolvedPromises = await Promise.allSettled(promises);
      const fetchedImages = resolvedPromises
        .filter((img) => img.status === "fulfilled")
        .map((img) => {
          // console.log(img);
          const file = URL.createObjectURL(img.value.data);
          return file;
        });
      if (state.isMounted) {
        dispatch({
          type: actionTypes.SUCCESS_LOADING,
          payload: fetchedImages,
        });
      } else {
        clearOnUnmount();
      }
      // } catch (e) {
      //   dispatch({ type: actionTypes.FAIL_LOADING, payload: e });
      // }
    };

    dispatch({ type: actionTypes.INIT_LOADING });
    try {
      fetchImagesAsync(images);
    } catch (e) {
      if (Axios.isCancel(e)) {
        console.log("Request cancelled");
      } else {
        dispatch({ type: actionTypes.FAIL_LOADING, payload: e });
      }
    }
  }, []);

  fetchImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
  };

  const clearOnUnmount = useCallback(() => {
    const images = [...state.fetchedImages];
    dispatch({ type: actionTypes.SUCCESS_LOADING, payload: [] });
    images.forEach((e) => URL.revokeObjectURL(e));
  }, [state.fetchedImages]);

  const destroyImages = () => {
    if (state.isMounted) {
      clearOnUnmount();
    }
    source.cancel();
    dispatch({ type: actionTypes.UNMOUNT });
  };

  const clearError = () => dispatch({ type: actionTypes.CLEAR_ERROR });

  return [state, fetchImages, destroyImages, clearError];
};
