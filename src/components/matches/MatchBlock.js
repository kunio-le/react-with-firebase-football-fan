import React, { Component } from 'react';

import { MatchInfoBlock, firebaseLooper, reverseArray } from '../ui/misc';

import { matchesData } from '../../firebase';

import Slide from 'react-reveal/Slide';

export class MatchBlock extends Component {
    state = {
        matches: []
    };

    componentDidMount() {
        matchesData
            .limitToLast(6)
            .once('value')
            .then(snapShot => {
                const data = reverseArray(firebaseLooper(snapShot));
                this.setState({ matches: data });
            })
            .catch(err => console.log(err));
    }
    render() {
        const matches = this.state.matches;
        return matches.map((match, i) => (
            <Slide key={i} bottom>
                <div className="item">
                    <div className="wrapper">
                        <MatchInfoBlock
                            date={match.date}
                            iconLocal={match.localThmb}
                            nameLocal={match.local}
                            goalLocal={match.final ? match.resultLocal : '-'}
                            iconAway={match.awayThmb}
                            nameAway={match.away}
                            goalAway={match.final ? match.resultAway : '-'}
                        />
                    </div>
                </div>
            </Slide>
        ));
    }
}

export default MatchBlock;
