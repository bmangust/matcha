import {
  Grid,
  makeStyles,
  Button,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useNotifications } from "../../hooks/useNotifications";
import { updateInfo } from "./additionalSlice";
import Step0 from "./Steps/Step0";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

const useStyles = makeStyles({
  Grid: {
    height: "100vh",
  },
  Stepper: {
    backgroundColor: "#ffffff00",
  },
  Buttons: {
    width: "100%",
  },
});

const steps = [
  {
    key: 0,
    view: <Step0 />,
    text: "Intro",
  },
  {
    key: 1,
    view: <Step1 />,
    text: "Who are you?",
  },
  {
    key: 2,
    view: <Step2 />,
    text: "Where are you?",
  },
  {
    key: 3,
    view: <Step3 />,
    text: "Who fits you?",
  },
];

const AdditionalInfo = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const showNotif = useNotifications();
  const history = useHistory();
  const dispatch = useDispatch();
  const info = useSelector((state) => state.additional);
  const {
    id,
    name,
    surname,
    username,
    birthDate,
    phone,
    gender,
    country,
    city,
    maxDist,
    lookFor,
    minAge,
    maxAge,
    updateSuccess,
  } = { ...info };
  const isLoading = useSelector((state) => state.general.isLoading);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log(
        "[AdditionalInfo] updateSuccess before dispatch",
        updateSuccess
      );
      dispatch(
        updateInfo(
          {
            id,
            name,
            surname,
            username,
            birthDate,
            phone,
            gender,
            country,
            city,
            maxDist,
            lookFor,
            minAge,
            maxAge,
          },
          showNotif,
          history
        )
      );
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Grid container justify="center" alignItems="center">
      <Grid
        item
        xs={12}
        sm={6}
        lg={4}
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.Grid}
      >
        {steps[activeStep].view}
        <Stepper
          className={classes.Stepper}
          activeStep={activeStep}
          alternativeLabel
        >
          {steps.map(({ key, text }) => (
            <Step key={key}>
              <StepLabel>{text}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container justify="space-evenly" className={classes.Buttons}>
          <Button
            disabled={isLoading || activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={isLoading}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdditionalInfo;
