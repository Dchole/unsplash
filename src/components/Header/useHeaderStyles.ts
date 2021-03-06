import { createStyles, makeStyles } from "@material-ui/core/styles";

const useHeaderStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: "#fffc",
      backdropFilter: "blur(6px)",
      transition: theme.transitions.create(["box-shadow", "background-color"], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeOut
      }),

      "&:focus-within": {
        backgroundColor: "#fff"
      }
    },
    input: {
      width: 240,
      flexGrow: 1,
      marginBottom: 10,
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeOut
      }),

      [theme.breakpoints.up("sm")]: {
        flexGrow: "initial",
        marginBottom: 0
      },

      "&:focus-within": {
        width: 500
      },

      "& .MuiOutlinedInput-input": {
        padding: theme.spacing(1.5, 1.75),
        fontFamily: "'Noto Sans', sans-serif"
      },

      "& .MuiOutlinedInput-inputAdornedStart": {
        paddingLeft: theme.spacing(1)
      },

      "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.grey[500]
      }
    },
    button: {
      fontFamily: "'Noto Sans', sans-serif"
    },
    fab: {
      position: "fixed",
      bottom: 20,
      right: 20,
      zIndex: theme.zIndex.speedDial
    }
  })
);

export default useHeaderStyles;
