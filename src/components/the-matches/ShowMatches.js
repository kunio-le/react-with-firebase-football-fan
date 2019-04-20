import React, { Component, Fragment } from 'react';

import { NodeGroup } from 'react-move';
import { easePolyOut } from 'd3-ease';

import { matchesData } from '../../firebase';

import { firebaseLooper, reverseArray } from '../ui/misc';

export class ShowMatches extends Component {
    state = {
        isLoading: true,
        matches: [],
        filterMatches: [],
        playedFilter: 'All',
        resultFilter: 'All'
    };

    showPlay = filter => {
        const played =
            filter === 'All'
                ? this.state.matches
                : this.state.matches.filter(match => match.final === filter);
        this.setState({ filterMatches: played, playedFilter: filter });
    };
    showResult = filter => {
        const played =
            filter === 'All'
                ? this.state.matches
                : this.state.matches.filter(match => match.result === filter);
        this.setState({ filterMatches: played, resultFilter: filter });
    };

    show = matches => (
        <NodeGroup
            data={matches}
            keyAccessor={d => d.id}
            start={() => ({
                opacity: 0,
                x: -200
            })}
            enter={d => ({
                opacity: [1],
                x: [0],
                timing: { duration: 750, ease: easePolyOut }
            })}
            update={(d, i) => ({
                opacity: [1],
                x: [0],
                timing: { duration: 750, delay: i * 50, ease: easePolyOut }
            })}
            leave={() => ({
                opacity: [0],
                x: [-200],
                timing: { duration: 750, ease: easePolyOut }
            })}>
            {nodes => (
                <div>
                    {nodes.map(({ key, data, state: { x, opacity } }) => (
                        <div
                            key={key}
                            className="match_box_big"
                            style={{ opacity, transform: `translate(${x}px)` }}>
                            <div className="block_wraper">
                                <div className="block">
                                    <div
                                        className="icon"
                                        style={{
                                            background: `url(images/team_icons/${
                                                data.localThmb
                                            }.png)`
                                        }}
                                    />
                                    <div className="team">{data.local}</div>
                                    <div className="result">
                                        {data.resultLocal}
                                    </div>
                                </div>

                                <div className="block">
                                    <div
                                        className="icon"
                                        style={{
                                            background: `url(images/team_icons/${
                                                data.awayThmb
                                            }.png)`
                                        }}
                                    />
                                    <div className="team">{data.away}</div>
                                    <div className="result">
                                        {data.resultAway}
                                    </div>
                                </div>
                            </div>

                            <div className="block_wraper nfo">
                                <div>
                                    <strong>Date: </strong>
                                    {data.date}
                                </div>
                                <div>
                                    <strong>Stadium: </strong>
                                    {data.stadium}
                                </div>
                                <div>
                                    <strong>Referee: </strong>
                                    {data.referee}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </NodeGroup>
    );

    componentDidMount() {
        matchesData.once('value').then(snap => {
            const result = reverseArray(firebaseLooper(snap));
            this.setState({
                matches: result,
                isLoading: false,
                filterMatches: result
            });
        });
    }

    render() {
        return (
            <Fragment>
                <div className="match_filters">
                    <div className="match_filters_box">
                        <div className="tag">Show Matches</div>
                        <div className="cont">
                            <div
                                className={`option ${this.state.playedFilter ===
                                    'All' && 'active'}`}
                                onClick={() => this.showPlay('All')}>
                                All
                            </div>
                            <div
                                className={`option ${this.state.playedFilter ===
                                    'Yes' && 'active'}`}
                                onClick={() => this.showPlay('Yes')}>
                                Played
                            </div>
                            <div
                                className={`option ${this.state.playedFilter ===
                                    'No' && 'active'}`}
                                onClick={() => this.showPlay('No')}>
                                Not Played
                            </div>
                        </div>
                    </div>

                    <div className="match_filters_box">
                        <div className="tag">Result Game</div>
                        <div className="cont">
                            <div
                                className={`option ${this.state.resultFilter ===
                                    'All' && 'active'}`}
                                onClick={() => this.showResult('All')}>
                                All
                            </div>
                            <div
                                className={`option ${this.state.resultFilter ===
                                    'W' && 'active'}`}
                                onClick={() => this.showResult('W')}>
                                Win
                            </div>
                            <div
                                className={`option ${this.state.resultFilter ===
                                    'L' && 'active'}`}
                                onClick={() => this.showResult('L')}>
                                Lose
                            </div>
                            <div
                                className={`option ${this.state.resultFilter ===
                                    'D' && 'active'}`}
                                onClick={() => this.showResult('D')}>
                                Draw
                            </div>
                        </div>
                    </div>
                </div>
                {this.show(this.state.filterMatches)}
            </Fragment>
        );
    }
}
export default ShowMatches;
