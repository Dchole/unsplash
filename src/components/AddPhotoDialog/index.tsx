import { useRef, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import useDialogStyles from "./useDialogStyles";
import TabPanel from "./TabPanel";

interface IAddPhotoDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AddPhotoDialog: React.FC<IAddPhotoDialogProps> = ({
  open,
  handleClose
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const classes = useDialogStyles();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [tab, setTab] = useState(0);
  const [values, setValues] = useState({
    label: "",
    url: ""
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(v => ({ ...v, [event.target.name]: event.target.value }));
  };

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const handleClick = () => inputRef?.current?.click();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleClearPreview = () => {
    setFile(null);
    setPreview("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(values);
  };

  return (
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
        />
        <Typography component="h2" variant="h6">
          Select method
        </Typography>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="Select upload method"
        >
          <Tab label="Url" id="from-url" />
          <Tab label="Device" id="from-device" />
        </Tabs>
        <TabPanel tab={tab} index={0}>
          <TextField
            id="url"
            name="url"
            type="url"
            margin="normal"
            variant="outlined"
            label="Photo Url"
            value={values.url}
            onChange={handleInput}
            fullWidth
          />
        </TabPanel>
        <TabPanel tab={tab} index={1}>
          {file ? (
            <div className={classes.preview}>
              <IconButton
                size="small"
                onClick={handleClearPreview}
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
                onClick={handleClick}
                fullWidth
              >
                Upload
              </Button>
            </>
          )}
        </TabPanel>
        <div className="dialog-actions">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default AddPhotoDialog;
