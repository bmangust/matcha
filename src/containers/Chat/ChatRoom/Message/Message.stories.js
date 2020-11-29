import { makeStyles } from "@material-ui/core";
import React from "react";
import defaultAvatar from "../../../../Images/default-avatar.png";
import { CONSTANTS } from "../../../../store/ws";

// import ChatRoom from '../ChatRoom';
import Message from "./Message";
export default {
  component: Message,
  title: "Message",
};

const useStyle = makeStyles({
  Wrapper: {
    width: "100%",
    textAlign: ({ self }) => (self ? "end" : "start"),
  },
});

const Wrapper = ({ self, children }) => {
  const classes = useStyle({ self });
  return <div className={classes.Wrapper}>{children}</div>;
};

const Template = (args) => (
  <Wrapper {...args}>
    <Message {...args} />
  </Wrapper>
);

export const SelfSent = Template.bind({});
SelfSent.args = {
  self: true,
  text: "qwerty",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.SENT_MESSAGE,
};

export const SelfDelivered = Template.bind({});
SelfDelivered.args = {
  self: true,
  text: "qwerty",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.DELIVERED_MESSAGE,
};

export const SelfRead = Template.bind({});
SelfRead.args = {
  self: true,
  text: "qwerty",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.READ_MESSAGE,
};

export const SelfMidText = Template.bind({});
SelfMidText.args = {
  self: true,
  text:
    "The Transition component lets you describe a transition from one component state to another.",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.READ_MESSAGE,
};

export const SelfLongText = Template.bind({});
SelfLongText.args = {
  self: true,
  text:
    "The Transition component lets you describe a transition from one component state to another over time with a simple declarative API.",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.READ_MESSAGE,
};

export const SelfReallyLongText = Template.bind({});
SelfReallyLongText.args = {
  self: true,
  text:
    "The Transition component lets you describe a transition from one component state to another over time with a simple declarative API. Most commonly it's used to animate the mounting and unmounting of a component, but can also be used to describe in-place transition states as well.",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.READ_MESSAGE,
};

export const OtherSent = Template.bind({});
OtherSent.args = {
  self: false,
  text: "qwerty",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.SENT_MESSAGE,
};

export const OtherDelivered = Template.bind({});
OtherDelivered.args = {
  self: false,
  text: "qwerty",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.DELIVERED_MESSAGE,
};

export const OtherRead = Template.bind({});
OtherRead.args = {
  self: false,
  text: "qwerty",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.READ_MESSAGE,
};

export const OtherMidText = Template.bind({});
OtherMidText.args = {
  self: false,
  text:
    "The Transition component lets you describe a transition from one component state to another.",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.READ_MESSAGE,
};

export const OtherLongText = Template.bind({});
OtherLongText.args = {
  self: false,
  text:
    "The Transition component lets you describe a transition from one component state to another over time with a simple declarative API.",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.READ_MESSAGE,
};

export const OtherReallyLongText = Template.bind({});
OtherReallyLongText.args = {
  self: false,
  text:
    "The Transition component lets you describe a transition from one component state to another over time with a simple declarative API. Most commonly it's used to animate the mounting and unmounting of a component, but can also be used to describe in-place transition states as well.",
  image: defaultAvatar,
  name: "Alex",
  date: new Date().getTime(),
  state: CONSTANTS.MESSAGE.READ_MESSAGE,
};
