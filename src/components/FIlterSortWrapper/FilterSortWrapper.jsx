import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { ExpandMoreRounded } from "@material-ui/icons";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import { secondaryColor } from "../../theme";
import cn from "classnames";

const useStyles = makeStyles((theme) => ({
  Wrapper: {
    position: "fixed",
    right: 0,
    bottom: "39px",
    zIndex: 6,
    minWidth: 400,
    maxWidth: 700,
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.up("md")]: {
      minWidth: "100%",
    },
  },
  Paper: {
    padding: "10px 40px",
    marginRight: 120,
    width: "70vw",
    maxHeight: "90vh",
    overflow: "auto",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginRight: "auto",
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      maxWidth: 550,
    },
  },
  ButtonLabel: {
    fontFamily: "Righteous",
    fontSize: "1.2rem",
    padding: "0 15px",
  },
  Active: {
    boxShadow: `0 0 5px ${secondaryColor.light}`,
  },
  Arrow: {
    transition: "0.3s",
  },
  Less: {
    transform: "rotateX(180deg)",
  },
}));

const FilterSortWrapper = () => {
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const classes = useStyles(content);

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const handleButtonPress = (button) => {
    const triggerShow = content ? button === content || !show : true;
    setContent(button);
    triggerShow && handleShow();
  };

  return (
    <Grid
      className={classes.Wrapper}
      container
      item
      xs={12}
      justify="center"
      self="flex-end"
    >
      <Paper className={classes.Paper}>
        <Grid container direction="column" alignItems="center">
          <Grid container item direction="column" alignItems="center">
            {show && (content === "filter" ? <Filter /> : <Sort />)}
          </Grid>
          <Grid container justify="space-evenly" alignItems="center" item>
            <ButtonGroup
              variant="text"
              color="secondary"
              aria-label="text primary button group"
            >
              <Button
                className={show && content === "filter" && classes.Active}
                classes={{ label: classes.ButtonLabel }}
                onClick={() => handleButtonPress("filter")}
              >
                Filter
              </Button>
              <Button
                className={show && content === "sort" && classes.Active}
                classes={{ label: classes.ButtonLabel }}
                onClick={() => handleButtonPress("sort")}
              >
                Sort
              </Button>
            </ButtonGroup>
            <Button onClick={handleShow} size="small" color="secondary">
              <ExpandMoreRounded
                className={
                  show ? classes.Arrow : cn(classes.Arrow, classes.Less)
                }
              />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default FilterSortWrapper;
