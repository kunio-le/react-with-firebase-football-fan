import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Header = () => {
    return (
        <AppBar
            position="fixed"
            style={{ borderBottom: 'solid 2px #32ef32', boxShadow: 'none' }}>
            <Toolbar style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>Logo</div>
                <Button color="inherit" component={Link} to="/the-team">
                    The Team
                </Button>
                <Button color="inherit" component={Link} to="/matches">
                    Matches
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
