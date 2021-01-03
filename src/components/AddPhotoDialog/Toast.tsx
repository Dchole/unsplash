import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

interface IToastProps {
  open: boolean;
  severity?: "success" | "info" | "warning" | "error";
  message: string;
  handleClose: () => void;
}

const Toast: React.FC<IToastProps> = ({
  open,
  severity = "error",
  message,
  handleClose
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2500}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default Toast;
