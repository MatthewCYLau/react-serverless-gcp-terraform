import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={LoginPage} />
    <PrivateRoute exact path="/dashboard" component={DashboardPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
