import { useState } from "react";
import Image from "next/image";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import useHeaderStyles from "./useHeaderStyles";

const Header = () => {
  const classes = useHeaderStyles();
  const [search, setSearch] = useState("");

  const handleInput = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setSearch(event.target.value);

  return (
    <AppBar
      color="inherit"
      position="sticky"
      elevation={0}
      className={classes.root}
    >
      <Toolbar>
        <Container component={Grid} justify="space-between" container>
          <Image src="/logo.svg" width="140" height="40" />
          <OutlinedInput
            id="search"
            placeholder="Search by name"
            aria-label="Search by name"
            value={search}
            onChange={handleInput}
            className={classes.input}
            startAdornment={<SearchIcon color="action" fontSize="small" />}
          />
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Add a photo
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
