import { createStyles, lighten, makeStyles } from "@material-ui/core/styles";

const useDialogStyles = makeStyles(theme =>
  createStyles({
    paper: {
      "& input[type=file]": {
        display: "none"
      },

      "& .MuiDialog-paper": {
        padding: theme.spacing(2),
        margin: 0,

        "& .dialog-actions": {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: theme.spacing(2),
          marginTop: theme.spacing(1)
        }
      },

      "& h2": {
        margin: theme.spacing(2, 0, 1),
        fontFamily: "'Montserrat', sans-serif"
      },

      "& .MuiTabs-root": {
        backgroundColor: theme.palette.grey[200],
        borderRadius: 4,

        "& .MuiTab-textColorInherit": {
          transition: theme.transitions.create(["color", "font-weight"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.short
          }),

          "&.Mui-selected": {
            fontWeight: "bold",
            color: theme.palette.secondary.main
          }
        },

        "& .MuiTabs-flexContainer": {
          justifyContent: "center"
        },

        "& button": {
          flexGrow: 1
        },

        "& .MuiTab-wrapper": {
          textTransform: "uppercase"
        }
      }
    },
    uploadBtn: {
      textTransform: "uppercase",
      padding: theme.spacing(1),
      margin: theme.spacing(2, 0),
      backgroundColor: lighten(theme.palette.primary.light, 0.8)
    },
    preview: {
      position: "relative",
      border: `1px solid ${theme.palette.primary.light}`,
      borderRadius: 8,

      "& img": {
        width: "100%"
      },

      "& button": {
        top: 8,
        right: 8,
        position: "absolute",
        border: `2px solid ${theme.palette.grey[400]}`,
        backgroundColor: "#fffa"
      }
    }
  })
);

export default useDialogStyles;
