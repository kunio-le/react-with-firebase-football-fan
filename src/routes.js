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
import AddEditMatch from './components/admin/matches/AddEditMatch';
import AdminMatches from './components/admin/matches';
import ShowPlayer from './components/admin/player/ShowPlayer';
import AddEditPlayer from './components/admin/player/AddEditPlayer';
import Error404 from './pages/Error404';

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
                <PrivateRoute
                    exact
                    path="/dashboard/edit-match/:id"
                    {...props}
                    component={AddEditMatch}
                />
                <PrivateRoute
                    exact
                    path="/dashboard/add-match"
                    {...props}
                    component={AddEditMatch}
                />
                <PrivateRoute
                    exact
                    path="/dashboard/players"
                    {...props}
                    component={ShowPlayer}
                />
                <PrivateRoute
                    exact
                    path="/dashboard/add-player"
                    {...props}
                    component={AddEditPlayer}
                />
                <PrivateRoute
                    exact
                    path="/dashboard/edit-player/:id"
                    {...props}
                    component={AddEditPlayer}
                />
                <PublicRoute
                    exact
                    path="/login"
                    {...props}
                    retricted={true}
                    component={Login}
                />
                <PublicRoute
                    exact
                    path="/"
                    {...props}
                    retricted={false}
                    component={HomePage}
                />
                <PublicRoute
                    exact
                    path="/the-team"
                    {...props}
                    retricted={false}
                    component={TheTeam}
                />
                <PublicRoute
                    exact
                    path="/matches"
                    {...props}
                    retricted={false}
                    component={Matches}
                />

                <PublicRoute
                    path="/error-404"
                    {...props}
                    retricted={false}
                    component={Error404}
                />
                <PublicRoute
                    {...props}
                    retricted={false}
                    component={Error404}
                />
            </Switch>
        </Layout>
    </Fragment>
);

export default Routes;
