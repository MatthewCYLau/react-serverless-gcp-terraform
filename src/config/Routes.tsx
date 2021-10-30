import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/dashboard" component={DashboardPage} />
    <Route exact path="/login" component={LoginPage} />

    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
