import {
  Button,
  ButtonGroup,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { ExpandLessRounded, ExpandMoreRounded } from "@material-ui/icons";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";

const useStyles = makeStyles((props) => ({
  Wrapper: {
    position: "fixed",
    left: 0,
    bottom: "39px",
    zIndex: 6,
  },
  Paper: {
    padding: "10px",
    width: "70vw",
  },
  ButtonLabel: {
    fontFamily: "Righteous",
    fontSize: "1.2rem",
  },
  Button: {
    padding: "0 15px",
  },
}));

const FilterSortWrapper = () => {
  const [content, setContent] = useState(<Filter />);
  const [show, setShow] = useState(false);
  const classes = useStyles(content);

  const handleShow = () => {
    setShow((prev) => !prev);
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
            {show && content}
          </Grid>
          <Grid container justify="space-evenly" alignItems="center" item>
            <ButtonGroup
              variant="text"
              color="secondary"
              aria-label="text primary button group"
            >
              <Button
                variant={content === <Filter /> && "outlined"}
                className={classes.Button}
                classes={{ label: classes.ButtonLabel }}
                onClick={() => setContent(<Filter />)}
              >
                Filter
              </Button>
              <Button
                variant={content === <Sort /> && "outlined"}
                className={classes.Button}
                classes={{ label: classes.ButtonLabel }}
                onClick={() => setContent(<Sort />)}
              >
                Sort
              </Button>
            </ButtonGroup>
            <Button onClick={handleShow} size="small" color="secondary">
              {show ? <ExpandMoreRounded /> : <ExpandLessRounded />}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default FilterSortWrapper;
