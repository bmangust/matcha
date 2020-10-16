import { Badge, Button, Grid, Typography, makeStyles } from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";
import { useLocation } from "react-router-dom";
import { primaryColor } from "../../theme";

const useStyles = makeStyles({
  Header: {
    textAlign: "center",
    fontFamily: "Righteous",
    color: primaryColor.dark,
  },
});

const Header = (props) => {
  const classes = useStyles();
  const { header, notification, handleBack, handleBadgeClick } = {
    ...props,
  };
  const loc = useLocation();
  //show backbutton only if we're in submenu
  const showBackButton = loc.pathname.split("/").length > 2;

  return (
    <Grid container item spacing={1}>
      <Grid item xs={1}>
        {showBackButton ? (
          <Button variant="text" color="inherit" onClick={handleBack}>
            <ChevronLeftRounded
              style={{ color: primaryColor.dark }}
              fontSize="large"
            />
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
            <NotificationsIcon
              style={{ color: primaryColor.dark }}
              fontSize="large"
            />
          </Badge>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
