import {
  Tabs,
  Tab,
  Container,
  makeStyles,
  Avatar,
  Badge,
  Fab,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import PublishIcon from "@material-ui/icons/Publish";
import React from "react";
import { connect } from "react-redux";
import { api, media } from "../../axios";
import TabPanel from "../../containers/TabPanel/TabPanel";
import { backgroundColor, primaryColor } from "../../theme";
import UpdateInfo from "../../containers/UpdateInfo/UpdateInfo";

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

const Profile = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [currentTab, setCurrentTab] = React.useState(0);

  const selectTabHandler = (e, next) => {
    setCurrentTab(next);
  };

  const changeAvatarHandler = async (e) => {
    const image = e.target.files[0];
    if (image.size > 1000000) {
      enqueueSnackbar("The file is larger than 1MB", { variant: "error" });
    }
    const base64Image = await toBase64(image);
    const data = {
      id: props.id,
      isAvatar: true,
      user_image: base64Image,
    };

    console.log(data);
    const res = await media.post("upload", data);
    console.log(res);
    enqueueSnackbar("The file was uploaded", { variant: "success" });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const tabs = buttons.map((el, index) => (
    <Tab disableRipple label={el.text} key={index} />
  ));

  const tabPanels = buttons.map((el, index) => (
    <TabPanel value={currentTab} index={index} key={index}>
      {el.component}
    </TabPanel>
  ));

  const getUsers = async () => {
    const res = await api.get("strangers");
    console.log(res.data);
  };

  const avatar =
    (props.images && props.images[0]) ||
    "https://avatarfiles.alphacoders.com/253/253160.jpg";

  return (
    <Container className={classes.Profile}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={
          <Fab
            color="primary"
            aria-label="upload image"
            component="label"
            onChange={(e) => changeAvatarHandler(e)}
          >
            <PublishIcon />
            <input type="file" style={{ display: "none" }} />
          </Fab>
        }
      >
        <Avatar className={classes.Avatar} alt="Travis Howard" src={avatar} />
      </Badge>

      <Tabs
        classes={{ root: classes.TabPanel, indicator: classes.indicator }}
        value={currentTab}
        onChange={selectTabHandler}
      >
        {tabs}
      </Tabs>
      {tabPanels}
      <Fab onClick={getUsers}>GET</Fab>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  id: state.general.id,
  images: state.general.images,
});

export default connect(mapStateToProps)(Profile);
