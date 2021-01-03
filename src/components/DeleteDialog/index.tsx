import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Toast from "../AddPhotoDialog/Toast";
import firebase from "@/lib/firebase-config";

interface IDeleteDialogProps {
  id: string;
  open: boolean;
  filename?: string;
  handleClose: () => void;
}

const DeleteDialog: React.FC<IDeleteDialogProps> = ({
  id,
  open,
  filename,
  handleClose
}) => {
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState("");

  const clearError = () => setError("");
  const resetDeleted = () => setDeleted(false);

  const handleDelete = async () => {
    try {
      // Delete file from storage if file was uploaded from device
      filename && firebase.storage().ref().child(`images/${filename}`).delete();

      // Delete doc
      firebase
        .firestore()
        .collection("images")
        .doc(id)
        .delete()
        .then(() => {
          handleClose();
          setDeleted(true);
        });
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="secondary" variant="contained" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Toast open={Boolean(error)} handleClose={clearError} message={error} />
      <Toast
        open={deleted}
        handleClose={resetDeleted}
        severity="info"
        message="Image Deleted!"
      />
    </>
  );
};

export default DeleteDialog;
