import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ user, component: Comp, retricted, ...rest }) => {
    return (
        <Route
            {...rest}
            component={props =>
                retricted ? (
                    user ? (
                        <Redirect to="/Dashboard" />
                    ) : (
                        <Comp {...props} user={user} />
                    )
                ) : (
                    <Comp {...props} user={user} />
                )
            }
        />
    );
};

export default PublicRoute;
