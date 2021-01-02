import React from "react";

import Header from "./Header";
export default {
  component: Header,
  title: "Header",
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: "Chat",
  notification: [
    "4567e1e306df5dd2ab333d9d499a1ab2f9071275e21f7d61265af04668b97789",
    "fe4c83fea2e99350a7d6688de16b2ecdb0074dddea4f86f83ba6b24a1468981a",
  ],
};
