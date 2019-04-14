import React, { Fragment } from 'react';
import Header from '../components/header-footer/Header';

const Layout = props => {
    return (
        <Fragment>
            <Header />

            {props.children}
        </Fragment>
    );
};

export default Layout;
