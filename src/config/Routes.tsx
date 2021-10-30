import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ResultsPage from '../pages/ResultsPage';
import NotFoundPage from '../pages/NotFoundPage';

const Routes = () => (
    <Switch>
        <Route exact path="/results" component={ResultsPage} />
        <Route component={NotFoundPage} />
    </Switch>
);

export default Routes;
