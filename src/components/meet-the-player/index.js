import React, { useState } from 'react';

import Reveal from 'react-reveal/Reveal';

import Stripes from '../../Resources/images/stripes.png';

import PlayerText from './PlayerText';
import PlayerCard from './PlayerCard';

const MeetThePlayer = () => {
    const [state, setstate] = useState(false);
    return (
        <div
            className="home_meetplayers"
            style={{
                background: `#ffffff url(${Stripes})`
            }}>
            <div className="home_meetplayers_wrapper">
                <Reveal fraction={0.8} onReveal={() => setstate(true)}>
                    <div className="home_card_wrapper">
                        <PlayerCard isShow={state} />
                    </div>
                </Reveal>
                <div className="home_text_wrapper">
                    <PlayerText />
                </div>
            </div>
        </div>
    );
};

export default MeetThePlayer;
