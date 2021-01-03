import Image from "next/image";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import usePhotoListing from "./usePhotoListing";
import { IPhotos } from "pages";

const PhotoListing: React.FC<IPhotos> = ({ photos }) => {
  const classes = usePhotoListing();

  return (
    <Container component="main" className={classes.container}>
      {photos.map(photo => (
        <div key={photo._id} className={classes.image}>
          <Button color="secondary" variant="outlined">
            delete
          </Button>
          <Typography>{photo.label}</Typography>
          <Image
            src={photo.photo}
            alt={photo.label}
            layout="fill"
            objectFit="cover"
            quality={50}
          />
        </div>
      ))}
    </Container>
  );
};

export default PhotoListing;
