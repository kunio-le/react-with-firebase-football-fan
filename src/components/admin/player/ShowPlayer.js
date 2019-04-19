import React, { Component } from 'react';

import AdminLayout from '../../../hoc/AdminLayout';
import { Link } from 'react-router-dom';

import { playerData } from '../../../firebase';

import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { reverseArray, firebaseLooper } from '../../ui/misc';

class ShowPlayer extends Component {
    state = {
        isLoading: true,
        players: []
    };

    componentDidMount() {
        playerData
            .once('value')
            .then(snapShot =>
                this.setState({
                    players: reverseArray(firebaseLooper(snapShot)),
                    isLoading: false
                })
            )
            .catch(err => console.log(err));
    }

    componentWillUnmount() {
        playerData.off();
    }

    loadingProgress = () => (
        <div style={{ textAlign: 'center', paddingTop: '15vh' }}>
            <CircularProgress disableShrink size={90} />
        </div>
    );

    showPlayers = players => (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Number</TableCell>
                        <TableCell align="center">Possition</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((player, i) => (
                        <TableRow key={i}>
                            <TableCell align="center">
                                <Link
                                    to={`/dashboard/edit-player/${player.id}`}>
                                    {player.name}
                                </Link>
                            </TableCell>

                            <TableCell align="center">
                                {player.lastname}
                            </TableCell>
                            <TableCell align="center">
                                {player.number}
                            </TableCell>
                            <TableCell align="center">
                                {player.position}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );

    render() {
        return (
            <AdminLayout>
                {this.state.isLoading
                    ? this.loadingProgress()
                    : this.showPlayers(this.state.players)}
            </AdminLayout>
        );
    }
}

export default ShowPlayer;
