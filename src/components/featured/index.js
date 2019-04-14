import React from 'react';

import Stripes from './Stripes';
import Text from './Text';
import Player from './Player';

const Featured = () => (
    <div className="featured_wrapper">
        <Stripes />
        <Player />
        <Text />
    </div>
);

export default Featured;
