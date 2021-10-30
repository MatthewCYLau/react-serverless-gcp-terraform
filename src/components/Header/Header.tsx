import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./Header.style";

const Header: React.FunctionComponent = () => {
  const styles = useStyles();
  return (
    <AppBar component="header" position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" className={styles.title}>
          Is-Even as a Service
        </Typography>
        <Button
          component={Link}
          variant="contained"
          color="primary"
          disableElevation
          to="/"
        >
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
