import { Badge, Button, Grid, Typography, makeStyles } from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";

const useStyles = makeStyles({
  Header: {
    textAlign: "center",
    fontFamily: "Righteous",
  },
});

const Header = (props) => {
  const classes = useStyles();
  const { header, notification, handleBack, handleBadgeClick } = {
    ...props,
  };
  const showBackButton = props.showBackButton || false;
  return (
    <Grid container item spacing={1}>
      <Grid item xs={1}>
        {showBackButton ? (
          <Button variant="text" color="inherit" onClick={handleBack}>
            <ChevronLeftRounded fontSize="large" />
          </Button>
        ) : null}
      </Grid>
      <Grid item xs={10}>
        <Typography variant="h4" className={classes.Header}>
          {header}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Button variant="text" color="inherit" onClick={handleBadgeClick}>
          <Badge
            color="secondary"
            overlap="circle"
            variant="dot"
            badgeContent={notification || 0}
          >
            <NotificationsIcon fontSize="large" />
          </Badge>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
