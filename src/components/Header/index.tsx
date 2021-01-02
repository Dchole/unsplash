import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useHeaderStyles from "./useHeaderStyles";
import useScroll from "@/hooks/useScroll";
import AddPhotoDialog from "../AddPhotoDialog";

// const AddPhotoDialog = dynamic(() => import("@/components/AddPhotoDialog"));

const options = ["Option 1", "Option 2"];

const Header = () => {
  const classes = useHeaderStyles();
  const elevate = useScroll();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInput = (
    _event: React.ChangeEvent<HTMLInputElement>,
    newValue: string
  ) => {
    setSearch(newValue);
  };

  return (
    <>
      <AppBar
        color="inherit"
        position="sticky"
        elevation={elevate ? 3 : 0}
        className={classes.root}
      >
        <Toolbar>
          <Container component={Grid} justify="space-between" container>
            <Image src="/logo.svg" alt="logo" width="140" height="40" />
            <Autocomplete
              id="search"
              options={options}
              inputValue={search}
              onInputChange={handleInput}
              className={classes.input}
              autoHighlight
              renderInput={params => (
                <OutlinedInput
                  type="search"
                  placeholder="Search by name"
                  ref={params.InputProps.ref}
                  startAdornment={
                    <SearchIcon color="action" fontSize="small" />
                  }
                  inputProps={{
                    "aria-label": "Search by name",
                    ...params.inputProps
                  }}
                  fullWidth
                />
              )}
            />
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={handleOpen}
            >
              Add a photo
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <AddPhotoDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default Header;
