import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { matchesData } from '../../../firebase';

import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { reverseArray, firebaseLooper } from '../../ui/misc';

export class MatchesTable extends Component {
    state = {
        isLoading: true,
        matches: []
    };
    componentDidMount() {
        matchesData
            .once('value')
            .then(snapShot =>
                this.setState({
                    matches: reverseArray(firebaseLooper(snapShot)),
                    isLoading: false
                })
            )
            .catch(err => console.log(err));
    }

    loadingProgress = () => (
        <div style={{ textAlign: 'center', paddingTop: '15vh' }}>
            <CircularProgress disableShrink size={90} />
        </div>
    );

    showMatches = matches => (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Match</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Final</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matches.map((match, i) => (
                        <TableRow key={i}>
                            <TableCell>{match.date}</TableCell>
                            <TableCell>
                                <Link to={`/dashboard/edit-match/${match.id}`}>
                                    {match.local} <strong>-</strong>{' '}
                                    {match.away}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {match.resultLocal} <strong>-</strong>{' '}
                                {match.resultAway}
                            </TableCell>
                            <TableCell>
                                {match.final ? (
                                    <div style={{ color: 'green' }}>Final</div>
                                ) : (
                                    <div style={{ color: 'red' }}>
                                        Not Played yet
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );

    render() {
        console.log(this.state.matches);
        return this.state.isLoading
            ? this.loadingProgress()
            : this.showMatches(this.state.matches);
    }
}

export default MatchesTable;
