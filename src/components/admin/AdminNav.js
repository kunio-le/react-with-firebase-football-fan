import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { firebase } from '../../firebase';

import ListItem from '@material-ui/core/ListItem';

const AdminNav = () => {
    const navList = [
        { name: 'Matches', linkTo: '/matches' },
        { name: 'AddMatches', linkTo: '/add-matches' },
        { name: 'Player', linkTo: '/player' },
        { name: 'AddPlayer', linkTo: '/add-player' }
    ];

    const logoutHandler = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log('logout successfull'))
            .catch(err => console.log(err));
    };

    return (
        <Fragment>
            {navList.map((nav, i) => (
                <div
                    key={i}
                    style={{
                        borderBottom: '1px solid #353535'
                    }}>
                    <Link to={nav.linkTo}>
                        <ListItem
                            button
                            style={{ color: '#ffffff', fontWeight: 300 }}>
                            {nav.name}
                        </ListItem>
                    </Link>
                </div>
            ))}
            <ListItem
                button
                style={{ color: '#ffffff', fontWeight: 300 }}
                onClick={() => logoutHandler()}>
                Logout
            </ListItem>
        </Fragment>
    );
};

export default AdminNav;
