import usePhotos from "@/hooks/usePhotos";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import getRandomArbitrary from "@/utils/randomRange";
import usePhotoListing from "./usePhotoListing";

const PhotoListing = () => {
  const classes = usePhotoListing();
  const { photos } = usePhotos();

  return (
    <Container component="main" className={classes.container}>
      {photos.length
        ? photos.map(photo => (
            <div key={photo.id} className={classes.image}>
              <Button color="secondary" variant="outlined">
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
  );
};

export default PhotoListing;
