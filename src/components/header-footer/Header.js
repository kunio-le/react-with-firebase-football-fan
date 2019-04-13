import React from 'react';
import { Link } from 'react-router-dom';

import { Logo } from '../ui/icons';
import MancityLogo from '../../Resources/images/logos/manchester_city_logo.png';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Header = () => {
    return (
        <AppBar
            position="fixed"
            style={{
                backgroundColor: '#98c5f9',
                borderBottom: 'solid 2px #00285e',
                boxShadow: 'none',
                padding: '5px 0'
            }}>
            <Toolbar style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                    <div className="header_logo">
                        <Logo
                            width="72px"
                            height="72px"
                            image={MancityLogo}
                            linkTo="/"
                        />
                    </div>
                </div>
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
