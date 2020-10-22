import { useState, useCallback, useReducer } from "react";
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
      throw new Error();
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
    dispatch({ type: actionTypes.INIT_LOADING });
    const promises = images.map((img) => media.get(img));
    Promise.all(promises)
      .then((imgs) => {
        console.log(imgs);
        const fetchedImages = imgs.map((img) => {
          const file = URL.createObjectURL(img.data);
          return file;
        });
        console.log(fetchedImages);
        dispatch({ type: actionTypes.SUCCESS_LOADING, payload: fetchedImages });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: actionTypes.FAIL_LOADING, payload: err });
      });
  }, []);

  fetchImages.propTypes = {
    images: PropTypes.array,
  };

  const destroyImages = useCallback(() => {
    state.fetchedImages.forEach((e) => URL.revokeObjectURL(e));
    dispatch({ type: actionTypes.SUCCESS_LOADING, payload: [] });
  }, [state.fetchedImages]);

  const clearError = () => dispatch({ type: actionTypes.CLEAR_ERROR });

  return [state, fetchImages, destroyImages, clearError];
};

useFetchedImages.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string),
};
