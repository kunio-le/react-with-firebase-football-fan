import React, { Fragment } from 'react';

import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import PrivateRoute from './hoc/PrivateRoute';
import PublicRoute from './hoc/PublicRoute';
import HomePage from './pages/HomePage';
import TheTeam from './pages/TheTeam';
import Matches from './pages/Matches';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';

const Routes = props => (
    <Fragment>
        <Layout>
            <Switch>
                <PrivateRoute
                    exact
                    path="/dashboard"
                    {...props}
                    component={Dashboard}
                />
                <PrivateRoute
                    exact
                    path="/dashboard/matches"
                    {...props}
                    component={AdminMatches}
                />
                <PublicRoute
                    exact
                    path="/login"
                    {...props}
                    retricted={true}
                    component={Login}
                />
                <Route exact path="/" component={HomePage} />
                <Route exact path="/the-team" component={TheTeam} />
                <Route exact path="/matches" component={Matches} />
            </Switch>
        </Layout>
    </Fragment>
);

export default Routes;
