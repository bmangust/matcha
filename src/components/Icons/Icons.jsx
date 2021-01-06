import { SvgIcon } from "@material-ui/core";
import React from "react";

export const MaleBlackIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 384 384" {...props}>
      <path d="m383.792969 13.9375c-.175781-1.378906-.480469-2.707031-.984375-3.953125-.015625-.03125-.015625-.074219-.023438-.113281 0-.007813-.007812-.015625-.015625-.023438-.554687-1.3125-1.3125-2.503906-2.167969-3.609375-.210937-.261719-.417968-.519531-.640624-.765625-.914063-1.03125-1.90625-1.984375-3.058594-2.761718-.03125-.023438-.070313-.03125-.101563-.054688-1.113281-.734375-2.34375-1.289062-3.632812-1.726562-.320313-.113282-.632813-.210938-.960938-.296876-1.351562-.367187-2.742187-.632812-4.207031-.632812h-112c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h73.367188l-95.496094 95.496094c-25.464844-20.367188-56.816406-31.496094-89.871094-31.496094-79.398438 0-144 64.601562-144 144s64.601562 144 144 144 144-64.601562 144-144c0-33.039062-11.121094-64.382812-31.503906-89.871094l95.503906-95.503906v73.375c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-112c0-.335938-.078125-.65625-.097656-.984375-.023438-.367187-.0625-.71875-.109375-1.078125zm-239.792969 338.0625c-61.761719 0-112-50.238281-112-112s50.238281-112 112-112c29.902344 0 58.054688 11.640625 79.222656 32.734375 21.136719 21.210937 32.777344 49.363281 32.777344 79.265625 0 61.761719-50.238281 112-112 112zm0 0" />
    </SvgIcon>
  );
};

export const FemaleBlackIcon = (props) => {
  return (
    <SvgIcon viewBox="0 0 384 384" {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m272 136c0-74.992188-61.007812-136-136-136s-136 61.007812-136 136c0 69.566406 52.535156 127.015625 120 134.976562v33.023438h-32c-8.832031 0-16 7.167969-16 16s7.167969 16 16 16h32v32c0 8.832031 7.167969 16 16 16s16-7.167969 16-16v-32h32c8.832031 0 16-7.167969 16-16s-7.167969-16-16-16h-32v-33.023438c67.464844-7.960937 120-65.410156 120-134.976562zm-240 0c0-57.34375 46.65625-104 104-104s104 46.65625 104 104-46.65625 104-104 104-104-46.65625-104-104zm0 0"
      />
    </SvgIcon>
  );
};

export const MaleColorIcon = ({
  colors = {
    elementColor: { main: "#89b0e0", shadow: "#6197d5" },
    ringColor: { main: "#99ddfc", shadow: "#66cdf7" },
  },
  ...rest
}) => {
  return (
    <SvgIcon viewBox="0 0 511 511" {...rest}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m465.029.009h-70.218c-21.163 0-38.477 17.315-38.477 38.477 0 15.974 9.868 29.748 23.808 35.544 2.544 1.058 3.228 4.333 1.279 6.281l-143.536 143.535 49.261 49.26 143.536-143.536c1.948-1.948 5.223-1.265 6.281 1.279 5.796 13.94 19.57 23.808 35.544 23.808 21.163 0 38.478-17.315 38.477-38.477v-70.218c.672-26.836-18.806-45.953-45.955-45.953z"
        fill={colors.elementColor.main}
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m301.028 160.703-63.143 63.143 49.261 49.26 62.107-62.108c-9.062-17.63-34.358-44.312-48.225-50.295z"
        fill={colors.elementColor.shadow}
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m172.157 166.679c-95.08 0-172.157 77.077-172.157 172.156s77.077 172.157 172.157 172.157 172.157-77.077 172.157-172.157-77.078-172.156-172.157-172.156zm0 278.623c-58.8 0-106.466-47.667-106.466-106.466s47.667-106.466 106.466-106.466c58.8 0 106.466 47.667 106.466 106.466s-47.667 106.466-106.466 106.466z"
        fill={colors.ringColor.main}
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m166.067 510.146c-10.713-22.493-19.376-45.941-26.316-69.873-42.953-13.71-74.061-53.938-74.061-101.438 0-45.748 28.857-84.752 69.359-99.816 1.911-7.469 3.992-14.898 6.242-22.279 3.69-12.108 7.948-24.071 13.413-35.503 2.329-4.871 4.904-9.746 7.926-14.293-90.647 4.945-162.63 80.009-162.63 171.891 0 93.162 74.002 169.028 166.428 172.052-.118-.248-.242-.493-.361-.741z"
        fill={colors.ringColor.shadow}
      />
    </SvgIcon>
  );
};

export const FemaleColorIcon = ({
  colors = {
    elementColor: { main: "#ef7d92", shadow: "#eb6773" },
    ringColor: { main: "#f6a7ae", shadow: "#f1919b" },
  },
  ...rest
}) => {
  return (
    <SvgIcon viewBox="0 0 511 511" {...rest}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m202.361 446.901h21.698v32.828c0 17.271 14.001 31.272 31.272 31.272 17.271 0 31.272-14.001 31.272-31.272v-32.828h22.037c14.985 0 27.133-12.148 27.133-27.133 0-14.985-12.148-27.133-27.133-27.133h-22.037v-98.818h-62.205l-.339 98.818h-21.698c-14.985 0-27.133 12.148-27.133 27.133 0 14.985 12.148 27.133 27.133 27.133z"
        fill={colors.elementColor.main}
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m286.602 371.971v-74.042h-62.205l-.245 74.042c15.854 4.399 49.488 3.211 62.45 0z"
        fill={colors.elementColor.shadow}
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m255.5 0c-95.136 0-172.259 77.123-172.259 172.259s77.123 172.259 172.259 172.259 172.259-77.123 172.259-172.259-77.123-172.259-172.259-172.259zm0 278.789c-58.835 0-106.53-47.695-106.53-106.53s47.695-106.53 106.53-106.53 106.53 47.695 106.53 106.53-47.695 106.53-106.53 106.53z"
        fill={colors.ringColor.main}
      />
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="m151.81 196.75c-1.851-7.864-2.84-16.061-2.84-24.49 0-58.835 47.695-106.53 106.53-106.53 8.385 0 16.541.978 24.367 2.81 23.675-14.885 48.337-28.117 74.948-37.027-28.069-19.844-62.326-31.513-99.315-31.513-95.136 0-172.259 77.123-172.259 172.259 0 42.205 15.187 80.858 40.383 110.812.493-1.003 7.644-48.436 28.186-86.321z"
        fill={colors.ringColor.shadow}
      />
    </SvgIcon>
  );
};
