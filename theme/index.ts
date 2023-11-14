import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { buttonTheme } from "./components/button";
import { headingTheme } from "./components/heading";
import colors from "./foundations/colors";
import radii from "./foundations/radii";
import typography from "./foundations/typography";
import styles from "./styles";

const overrides = {
  styles,
  colors,
  radii,
  ...typography,
  components: {
    Button: buttonTheme,
    Heading: headingTheme,
  },
};

const theme = extendTheme(overrides, withDefaultColorScheme({ colorScheme: "primary" }));

export default theme;
