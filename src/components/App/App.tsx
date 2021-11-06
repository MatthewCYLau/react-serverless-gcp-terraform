import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { store } from "../../store";
import useStyles from "./App.style";
import createTheme from "../../config/Theme";
import Routes from "../../config/Routes";
import Header from "../Header";

export const ColorModeContext = React.createContext({
  mode: "",
  toggleColorMode: () => {},
});

const App = () => {
  const styles = useStyles();

  return (
    <Provider store={store}>
      <Router>
        <div className={styles.root}>
          <Header />
          <Switch>
            <Route component={Routes} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

const AppWithTheme = () => {
  const [mode, setMode] = React.useState("light");
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = React.useMemo(() => createTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AppWithTheme;
