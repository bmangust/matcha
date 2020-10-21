import { Badge, Button, Grid, Typography, makeStyles } from "@material-ui/core";
import { ChevronLeftRounded } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { handleBack } from "../../store/UISlice";
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
  const { header, notification, handleBadgeClick } = {
    ...props,
  };
  const loc = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleBackButton = () => {
    const parent = loc.pathname.split("/")[1];
    dispatch(handleBack(history, parent));
  };
  //show backbutton only if we're in submenu
  const showBackButton = loc.pathname.split("/").length > 2;

  return (
    <Grid container item spacing={1}>
      <Grid item xs={1}>
        {showBackButton ? (
          <Button variant="text" color="inherit" onClick={handleBackButton}>
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
