import React, { Fragment } from 'react';

import Featured from '../components/featured';
import Matches from '../components/matches';
import MeetThePlayer from '../components/meet-the-player';

const HomePage = () => {
    return (
        <Fragment>
            <div className="bck_blue">
                <Featured />
            </div>
            <Matches />
            <MeetThePlayer />
        </Fragment>
    );
};

export default HomePage;
