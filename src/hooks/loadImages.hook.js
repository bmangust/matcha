import { useCallback, useReducer } from "react";
import { media } from "../axios";
import PropTypes from "prop-types";

const actionTypes = {
  INIT_LOADING: "INIT_LOADING",
  SUCCESS_LOADING: "SUCCESS_LOADING",
  FAIL_LOADING: "FAIL_LOADING",
  CLEAR_ERROR: "CLEAR_ERROR",
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
    default:
      throw new Error("Wrong action type in loadImages hook");
  }
};

export const useFetchedImages = () => {
  const [state, dispatch] = useReducer(fetchImagesReducer, {
    isLoading: false,
    error: null,
    fetchedImages: [],
  });

  const fetchImages = useCallback((images) => {
    if (!images) return;

    const fetchImagesAsync = async (images) => {
      try {
        const promises = images.map((img) => media(`img/${img}`));
        const resolvedPromises = await Promise.allSettled(promises);
        const fetchedImages = resolvedPromises
          .filter((img) => img.status === "fulfilled")
          .map((img) => {
            console.log(img);
            const file = URL.createObjectURL(img.value.data);
            return file;
          });
        dispatch({ type: actionTypes.SUCCESS_LOADING, payload: fetchedImages });
      } catch (e) {
        console.log(e);
        throw new Error("Fetching images failed");
      }
    };

    dispatch({ type: actionTypes.INIT_LOADING });
    try {
      fetchImagesAsync(images);
    } catch (err) {
      dispatch({ type: actionTypes.FAIL_LOADING, payload: err });
    }
  }, []);

  fetchImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
  };

  const destroyImages = useCallback(() => {
    const images = [...state.fetchedImages];
    dispatch({ type: actionTypes.SUCCESS_LOADING, payload: [] });
    images.forEach((e) => URL.revokeObjectURL(e));
  }, [state.fetchedImages]);

  const clearError = () => dispatch({ type: actionTypes.CLEAR_ERROR });

  return [state, fetchImages, destroyImages, clearError];
};
