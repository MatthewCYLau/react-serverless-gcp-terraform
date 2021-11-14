import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import LandingPage from "../pages/LandingPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import CreateTodoPage from "../pages/CreateTodoPage";
import NotFoundPage from "../pages/NotFoundPage";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/login" component={LoginPage} />
    <Route exact path="/registration" component={RegistrationPage} />
    <PrivateRoute exact path="/dashboard" component={DashboardPage} />
    <PrivateRoute exact path="/create-todo" component={CreateTodoPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
