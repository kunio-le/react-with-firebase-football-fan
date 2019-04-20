import React, { Component } from 'react';

import Fade from 'react-reveal/Fade';

import { firebase, playerData } from '../firebase';

import { firebaseLooper } from '../components/ui/misc';
import Card from '../components/ui/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

import Stripes from '../Resources/images/stripes.png';

import { Promise } from 'core-js';

class TheTeam extends Component {
    state = {
        isLoading: true,
        players: []
    };

    addUrlImage = orgPlayers => {
        let promises = [];
        for (let key in orgPlayers) {
            promises.push(
                new Promise(resolve => {
                    firebase
                        .storage()
                        .ref('players')
                        .child(orgPlayers[key].image)
                        .getDownloadURL()
                        .then(url => {
                            orgPlayers[key].url = url;
                            resolve();
                        });
                })
            );
        }

        Promise.all(promises).then(() => {
            this.setState({ isLoading: false, players: orgPlayers });
        });
    };

    showPlayersByCat = cat =>
        this.state.players &&
        this.state.players.map(
            (player, i) =>
                player.position === cat && (
                    <Fade left key={i} delay={i * 70}>
                        <div className="item">
                            <Card
                                number={player.number}
                                name={player.name}
                                lastName={player.lastname}
                                thmb={player.url}
                            />
                        </div>
                    </Fade>
                )
            //
        );

    loadingProgress = () => (
        <div style={{ textAlign: 'center', paddingTop: '15vh' }}>
            <CircularProgress disableShrink size={90} />
        </div>
    );

    componentDidMount() {
        playerData.once('value').then(snapShot => {
            this.addUrlImage(firebaseLooper(snapShot));
        });
    }

    componentWillUnmount() {
        playerData.off();
    }

    render() {
        return (
            <div
                className="the_team_container"
                style={{ background: `url(${Stripes}) repeat` }}>
                {this.state.isLoading
                    ? this.loadingProgress()
                    : ['Keeper', 'Defence', 'Midfield', 'Striker'].map(
                        (pos, i) => (
                            <div className="team_category_wrapper" key={i}>
                                <div className="title">{pos}</div>
                                <div className="team_cards">
                                    {this.showPlayersByCat(pos)}
                                </div>
                            </div>
                        )
                    )}
            </div>
        );
    }
}

export default TheTeam;
