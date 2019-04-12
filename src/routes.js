import React, { Fragment } from 'react';

import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TheTeam from './pages/TheTeam';
import Matches from './pages/Matches';

const Routes = () => (
    <Fragment>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/the-team" component={TheTeam} />
        <Route exact path="/matches" component={Matches} />
    </Fragment>
);

export default Routes;
