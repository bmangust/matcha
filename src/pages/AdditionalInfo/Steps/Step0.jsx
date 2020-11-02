import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";

const Step0 = () => {
  return (
    <Container>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography>There's some info missing about you</Typography>
        <Typography>Please take a quick survey</Typography>
      </Grid>
    </Container>
  );
};

export default Step0;
