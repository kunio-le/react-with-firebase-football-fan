import React, { Fragment } from 'react';

import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import HomePage from './pages/HomePage';
import TheTeam from './pages/TheTeam';
import Matches from './pages/Matches';

const Routes = () => (
    <Fragment>
        <Layout>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/the-team" component={TheTeam} />
                <Route exact path="/matches" component={Matches} />
            </Switch>
        </Layout>
    </Fragment>
);

export default Routes;
