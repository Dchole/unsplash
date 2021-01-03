import { createStyles, makeStyles } from "@material-ui/core/styles";

const usePhotoListing = makeStyles(theme =>
  createStyles({
    container: {
      margin: theme.spacing(3, "auto"),
      width: "100%",
      minHeight: "100vh",
      columnCount: 1,

      [theme.breakpoints.up("sm")]: {
        columnCount: 2
      },

      [theme.breakpoints.up("md")]: {
        columnCount: 3
      }
    },
    image: {
      position: "relative",
      width: "100%",
      marginBottom: 8,
      borderRadius: 8,

      "& button, & p": {
        transition: theme.transitions.create("opacity", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.short
        }),
        position: "absolute",
        zIndex: 1000,
        opacity: 0
      },

      "& .MuiButton-root": {
        top: theme.spacing(2),
        right: theme.spacing(2),
        borderWidth: 2
      },

      "& p": {
        bottom: theme.spacing(2),
        left: theme.spacing(2),
        color: "white"
      },

      "&:hover p, &:focus p, &:focus-within p, &:hover button, &:focus button, &:focus-within button": {
        opacity: 1
      },

      "&:hover img, &:focus img, &:focus-within img": {
        filter: "blur(1.5px) brightness(0.5)"
      },

      "& img": {
        borderRadius: 8,
        width: "100%",
        transition: theme.transitions.create("filter", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.short
        })
      }
    },
    skeleton: {
      marginBottom: theme.spacing(2),
      borderRadius: 8
    }
  })
);

export default usePhotoListing;
