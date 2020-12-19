import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../components/Form/Form";
import {
  changeLookFor,
  changeMaxDist,
  changeSearchAgeRange,
} from "../additionalSlice";

const Step3 = () => {
  const dispatch = useDispatch();
  const { lookFor, maxAge, minAge, maxDist } = useSelector(
    (state) => state.additional
  );

  const inputs = [
    {
      name: "lookFor",
      type: "radio",
      label: "I look for",
      values: ["male", "female", "both"],
      value: lookFor,
      onChange: (e) => {
        dispatch(changeLookFor(e.target.value));
      },
    },
    {
      name: "maxDistance",
      type: "slider",
      label: "Search distance, km",
      step: 10,
      min: 10,
      max: 10000,
      value: maxDist,
      onChange: (value) => {
        dispatch(changeMaxDist(value));
      },
    },
    {
      name: "ageRange",
      type: "slider",
      label: "Age search range",
      value: [minAge, maxAge],
      onChange: (value) => {
        dispatch(changeSearchAgeRange(value));
      },
    },
  ];
  return <Form inputs={inputs} />;
};

export default Step3;
