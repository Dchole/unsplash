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
import useHeaderStyles from "./useHeaderStyles";
import useScroll from "@/hooks/useScroll";

const AddPhotoDialog = dynamic(() => import("@/components/AddPhotoDialog"));

const Header = () => {
  const classes = useHeaderStyles();
  const elevate = useScroll();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setSearch(event.target.value);

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
            <OutlinedInput
              id="search"
              type="search"
              placeholder="Search by name"
              value={search}
              onChange={handleInput}
              className={classes.input}
              startAdornment={<SearchIcon color="action" fontSize="small" />}
              autoComplete="search"
              inputProps={{ "aria-label": "Search by name" }}
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
