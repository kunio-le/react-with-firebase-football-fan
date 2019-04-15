import React, { Fragment } from 'react';

import Featured from '../components/featured';
import Matches from '../components/matches';

const HomePage = () => {
    return (
        <Fragment>
            <div className="bck_blue">
                <Featured />
            </div>
            <Matches />
        </Fragment>
    );
};

export default HomePage;
