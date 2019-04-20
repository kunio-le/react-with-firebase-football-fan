import React, { Component } from 'react';
import { firebaseDB } from '../../firebase';
import { firebaseLooper } from '../ui/misc';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const style = {
    cell: {
        padding: '4px 16px 4px 11px',
        borderBottom: '1px solid #ffffff',
        color: '#ffffff'
    }
};

class LeagueTable extends Component {
    state = {
        positions: []
    };

    componentDidMount() {
        firebaseDB
            .ref('positions')
            .once('value')
            .then(snapshot => {
                const positions = firebaseLooper(snapshot);

                this.setState({
                    positions: positions
                });
            });
    }

    showTeampositions = pos =>
        pos
            ? pos.map((pos, i) => (
                <TableRow key={i}>
                    <TableCell align="center" style={style.cell}>
                        {i + 1}
                    </TableCell>
                    <TableCell align="center" style={style.cell}>
                        {pos.team}
                    </TableCell>
                    <TableCell align="center" style={style.cell}>
                        {pos.w}
                    </TableCell>
                    <TableCell align="center" style={style.cell}>
                        {pos.d}
                    </TableCell>
                    <TableCell align="center" style={style.cell}>
                        {pos.l}
                    </TableCell>
                    <TableCell align="center" style={style.cell}>
                        {pos.pts}
                    </TableCell>
                </TableRow>
            ))
            : null;

    render() {
        return (
            <div className="league_table_wrapper">
                <div className="title">League Table</div>
                <div style={{ background: '#98c6e9' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={style.cell}>
                                    Pos
                                </TableCell>
                                <TableCell align="center" style={style.cell}>
                                    Team
                                </TableCell>
                                <TableCell align="center" style={style.cell}>
                                    W
                                </TableCell>
                                <TableCell align="center" style={style.cell}>
                                    L
                                </TableCell>
                                <TableCell align="center" style={style.cell}>
                                    D
                                </TableCell>
                                <TableCell align="center" style={style.cell}>
                                    Pts
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.showTeampositions(this.state.positions)}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default LeagueTable;
