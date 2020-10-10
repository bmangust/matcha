import {
  Tabs,
  Tab,
  Container,
  makeStyles,
  Avatar,
  Badge,
  Fab,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import React from "react";
import { api } from "../../axios";
import UpdateInfo from "../../components/UpdateInfo/UpdateInfo";
import TabPanel from "../../containers/TabPanel/TabPanel";
import { backgroundColor, primaryColor } from "../../theme";

const useStyles = makeStyles({
  indicator: {
    backgroundColor: "#ffffff00",
    border: `1px solid ${primaryColor.dark}`,
    bottom: 0,
    height: "100%",
    borderRadius: "30px",
  },
  TabPanel: {
    backgroundColor: backgroundColor.foreground,
    borderRadius: "30px",
    padding: "5px",
  },
  Profile: {
    minHeight: "100vh",
    padding: "30px",
    paddingBlockEnd: "40px",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  Avatar: {
    width: "300px",
    height: "300px",
  },
});

const buttons = [
  {
    text: "Info",
    component: <UpdateInfo />,
  },
  {
    text: "Visitors",
    component: <div>visitors</div>,
  },
  {
    text: "Favorites",
    component: <div>favorites</div>,
  },
];

const Profile = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

  const selectTabHandler = (e, next) => {
    setCurrentTab(next);
  };

  const changeAvatarHandler = (e) => {
    console.log("[Profile] change avatar");
  };

  const tabs = buttons.map((el, index) => (
    <Tab disableRipple label={el.text} key={index} />
  ));

  const tabPanels = buttons.map((el, index) => (
    <TabPanel value={currentTab} index={index} key={index}>
      {el.component}
    </TabPanel>
  ));

  return (
    <Container className={classes.Profile}>
      <h2>Profile</h2>

      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <Fab color="primary" aria-label="upload image" component="label">
            <PublishIcon />
            <input type="file" style={{ display: "none" }} />
          </Fab>
        }
      >
        <Avatar
          className={classes.Avatar}
          alt="Travis Howard"
          src="https://avatarfiles.alphacoders.com/253/253160.jpg"
        />
      </Badge>

      <Tabs
        classes={{ root: classes.TabPanel, indicator: classes.indicator }}
        value={currentTab}
        onChange={selectTabHandler}
      >
        {tabs}
      </Tabs>
      {tabPanels}
    </Container>
  );
};

export default Profile;
