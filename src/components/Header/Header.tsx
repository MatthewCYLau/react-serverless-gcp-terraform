import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import useStyles from "./Header.style";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../App/App";

const Header: React.FunctionComponent = () => {
  const styles = useStyles();
  const context = React.useContext(ColorModeContext);
  const { isAuthenticated } = useTypedSelector((state) => state.authState);
  const { logout } = useActions();

  return (
    <AppBar component="header" position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" className={styles.title}>
          GCP Serverless
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
        <Button
          component={Link}
          variant="contained"
          color="primary"
          disableElevation
          to="/dashboard"
        >
          Dashboard
        </Button>
        {isAuthenticated && (
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={logout}
          >
            Logout
          </Button>
        )}

        <IconButton onClick={context.toggleColorMode} color="inherit">
          {context.mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
