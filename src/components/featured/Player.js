import React from 'react';

import { Animate } from 'react-move';
import { easePolyOut } from 'd3-ease';

import PlayerImg from '../../Resources/images/featured_player-min.png';

const Player = () => {
    return (
        <Animate
            show={true}
            start={{
                opacity: [0],
                translateY: [5],
                translateX: [100]
            }}
            enter={{
                opacity: [1],
                translateY: [5],
                translateX: [40],
                timing: {
                    delay: 300,
                    duration: 1000,
                    ease: easePolyOut
                }
            }}>
            {({ opacity, translateY, translateX }) => (
                <div
                    className="featured_player"
                    style={{
                        opacity: [opacity],
                        background: `url(${PlayerImg})`,
                        transform: `translate(${translateX}vw, ${translateY}vh)`
                    }}
                />
            )}
        </Animate>
    );
};

export default Player;
