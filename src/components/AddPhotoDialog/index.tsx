import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import firebase from "@/lib/firebase-config";
import useDialogStyles from "./useDialogStyles";
import TabPanel from "./TabPanel";
import slugify from "@/utils/slugify";

const Toast = dynamic(() => import("./Toast"));

interface IAddPhotoDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AddPhotoDialog: React.FC<IAddPhotoDialogProps> = ({
  open,
  handleClose
}) => {
  const classes = useDialogStyles();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [tab, setTab] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    label: "",
    photoURL: ""
  });

  const clearError = () => setError("");

  const clearPreview = () => {
    setFile(null);
    setPreview("");
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(v => ({ ...v, [event.target.name]: event.target.value }));
  };

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
    // Clear field when tab changes
    newValue === 0 ? clearPreview() : setValues(v => ({ ...v, photoURL: "" }));
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];

    if (file.type.includes("image/")) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setError("Invalid file type");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setUploading(true);

      const database = firebase.firestore().collection("images").doc();
      const storageRef = firebase.storage().ref();

      if (!values.label) throw new Error();

      let valuesCopy = { ...values };
      let filename: string;

      if (file) {
        filename = `${slugify(values.label)}.${file.name.split(".").pop()}`;

        const photoURL = await storageRef
          .child(`images/${filename}`)
          .put(file)
          .then(snapshot => snapshot.ref.getDownloadURL());

        valuesCopy.photoURL = photoURL;
        setTab(0);
      }

      filename
        ? database.set({
            ...valuesCopy,
            filename,
            date: firebase.firestore.Timestamp.fromDate(new Date())
          })
        : database.set({
            ...valuesCopy,
            date: firebase.firestore.Timestamp.fromDate(new Date())
          });

      setValues({ photoURL: "", label: "" });
      clearPreview();
      clearError();
      handleClose();
    } catch (error) {
      setError("Something went wrong!");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <TextField
            id="label"
            name="label"
            variant="outlined"
            label="Label"
            value={values.label}
            onChange={handleInput}
            autoComplete="off"
            fullWidth
            required
          />
          <Typography component="h2" variant="h6">
            Select method
          </Typography>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="Select upload method"
          >
            <Tab label="Url" id="option-0" />
            <Tab label="Device" id="option-1" />
          </Tabs>
          <TabPanel tab={tab} index={0}>
            <TextField
              id="photoURL"
              name="photoURL"
              type="photoURL"
              margin="normal"
              variant="outlined"
              label="Photo Url"
              value={values.photoURL}
              onChange={handleInput}
              fullWidth
              required
            />
          </TabPanel>
          <TabPanel tab={tab} index={1}>
            {file ? (
              <div className={classes.preview}>
                <IconButton
                  size="small"
                  onClick={clearPreview}
                  aria-label="clear preview"
                >
                  <CloseIcon />
                </IconButton>
                <img src={preview} alt="preview" />
              </div>
            ) : (
              <>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                />
                <Button
                  color="primary"
                  startIcon={<AddIcon />}
                  className={classes.uploadBtn}
                  onClick={() => inputRef?.current?.click()}
                  fullWidth
                >
                  Upload
                </Button>
              </>
            )}
          </TabPanel>
          <div className="dialog-actions">
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={uploading}
              disableElevation={uploading}
            >
              {uploading ? <CircularProgress size={25} /> : "Save"}
            </Button>
          </div>
        </form>
      </Dialog>
      <Toast open={Boolean(error)} message={error} handleClose={clearError} />
    </>
  );
};

export default AddPhotoDialog;
