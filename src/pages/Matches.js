import React from 'react';

import LeagueTable from '../components/the-matches/LeagueTable';
import ShowMatches from '../components/the-matches/ShowMatches';

const Matches = () => {
    return (
        <div className="the_matches_container">
            <div className="the_matches_wrapper">
                <div className="left">
                    <ShowMatches />
                </div>
                <div className="right">
                    <LeagueTable />
                </div>
            </div>
        </div>
    );
};

export default Matches;
