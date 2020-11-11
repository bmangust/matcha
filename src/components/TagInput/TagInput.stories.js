import React from "react";

import TagInput from "./TagInput";
export default {
  component: TagInput,
  title: "TagInput",
};

const Template = (args) => <TagInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  tags: [],
};
