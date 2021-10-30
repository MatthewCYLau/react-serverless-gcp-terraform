import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { store } from "../../store";
import useStyles from "./App.style";
import createTheme from "../../config/Theme";
import Routes from "../../config/Routes";
import Header from "../Header";
import HomePage from "../../pages/HomePage";

const App = () => {
  const styles = useStyles();

  return (
    <Provider store={store}>
      <Router>
        <div className={styles.root}>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={Routes} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

const AppWithTheme = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = React.useMemo(
    () => createTheme(prefersDarkMode),
    [prefersDarkMode]
  );

  return <ThemeProvider theme={theme} children={<App />}></ThemeProvider>;
};

export default AppWithTheme;
