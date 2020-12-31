import { createStyles, makeStyles } from "@material-ui/core/styles";

const usePhotoListing = makeStyles(theme =>
  createStyles({
    container: {
      margin: theme.spacing(3, "auto"),
      width: "100%",
      minHeight: "100vh",
      columnCount: 3
    },
    image: {
      position: "relative",
      width: "100%",
      marginBottom: 8,
      borderRadius: 8,

      "& > div": {
        display: "initial !important",
        overflow: "auto !important",
        position: "initial !important",

        "& img": {
          borderRadius: 8,
          visibility: "initial !important",
          position: "initial !important",
          display: "initial !important",
          width: "100% !important",
          height: "100% !important",
          minWidth: "100% !important",
          maxWidth: "100% !important",
          minHeight: "100% !important",
          maxHeight: "100% !important"
        }
      }
    }
  })
);

export default usePhotoListing;
