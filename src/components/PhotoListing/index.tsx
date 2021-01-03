import { useContext, useState } from "react";
import { PhotosContext } from "PhotosContext";
import dynamic from "next/dynamic";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import getRandomArbitrary from "@/utils/randomRange";
import usePhotoListing from "./usePhotoListing";

const DeleteDialog = dynamic(() => import("@/components/DeleteDialog"));

const PhotoListing = () => {
  const classes = usePhotoListing();
  const { photos } = useContext(PhotosContext);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState({ id: "", filename: "" });

  const handleClose = () => setOpen(false);
  const handleOpen = (photoID: string) => () => {
    const { id, filename } = photos.find(p => p.id === photoID);

    setPhoto({ id, filename });
    setOpen(true);
  };

  return (
    <>
      <Container component="main" className={classes.container}>
        {photos.length
          ? photos.map(photo => (
              <div key={photo.id} className={classes.image}>
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleOpen(photo.id)}
                >
                  delete
                </Button>
                <Typography>{photo.label}</Typography>
                <img src={photo.photoURL} alt={photo.label} />
              </div>
            ))
          : [...new Array(8)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rect"
                height={getRandomArbitrary(200, 360)}
                className={classes.skeleton}
              />
            ))}
      </Container>
      <DeleteDialog
        id={photo.id}
        open={open}
        filename={photo.filename}
        handleClose={handleClose}
      />
    </>
  );
};

export default PhotoListing;
