import React, { Fragment } from 'react';

import Featured from '../components/featured';
import Matches from '../components/matches';
import MeetThePlayer from '../components/meet-the-player';
import Promotion from '../components/promotion';

const HomePage = () => {
    return (
        <Fragment>
            <div className="bck_blue">
                <Featured />
            </div>
            <Matches />
            <MeetThePlayer />
            <Promotion />
        </Fragment>
    );
};

export default HomePage;
