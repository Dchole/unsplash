import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3DB46D"
    },
    secondary: {
      main: "#EB5757"
    },
    background: {
      default: "#fff"
    }
  },
  typography: {
    button: {
      textTransform: "initial"
    }
  }
});

export default theme;
