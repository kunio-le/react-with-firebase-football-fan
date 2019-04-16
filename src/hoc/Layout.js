import React, { Fragment } from 'react';
import Header from '../components/header-footer/Header';
import Footer from '../components/header-footer/Footer';

const Layout = props => {
    return (
        <Fragment>
            <Header />

            {props.children}
            <Footer />
        </Fragment>
    );
};

export default Layout;
