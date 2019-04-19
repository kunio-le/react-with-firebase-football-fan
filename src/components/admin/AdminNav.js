import React, { Fragment } from 'react';

import { Link, Redirect } from 'react-router-dom';

import { firebase } from '../../firebase';

import ListItem from '@material-ui/core/ListItem';

const AdminNav = () => {
    const navList = [
        { name: 'Matches', linkTo: '/dashboard/matches' },
        { name: 'AddMatches', linkTo: '/dashboard/add-match' },
        { name: 'Player', linkTo: '/dashboard/players' },
        { name: 'AddPlayer', linkTo: '/dashboard/add-player' }
    ];

    const logoutHandler = () => {
        firebase
            .auth()
            .signOut()
            .then(() => <Redirect to="/" />)
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
