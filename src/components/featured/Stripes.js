import React from 'react';

import { Animate } from 'react-move';
import { easePolyOut } from 'd3-ease';

const Stripes = () => {
    const stripes = [
        {
            top_left: 42,
            top_right: 55,
            bot_right: 30,
            bot_left: 17,
            background: '#98c5f9',
            delay: 200
        },
        {
            top_left: 56,
            top_right: 69,
            bot_right: 44,
            bot_left: 31,
            background: '#ffffff',
            delay: 400
        },
        {
            top_left: 70,
            top_right: 83,
            bot_right: 58,
            bot_left: 45,
            background: '#98c5f9',
            delay: 600
        }
    ];
    const ShowStripe = () =>
        stripes.map((stripe, i) => (
            <Animate
                key={i}
                show={true}
                start={{
                    opacity: 0,
                    top_left: 0,
                    top_right: 0,
                    bot_right: 0,
                    bot_left: 0,
                    background: `${stripe.background}`
                }}
                enter={{
                    opacity: [1],
                    top_left: [stripe.top_left],
                    top_right: [stripe.top_right],
                    bot_right: [stripe.bot_right],
                    bot_left: [stripe.bot_left],
                    background: `${stripe.background}`,
                    timing: {
                        delay: stripe.delay,
                        duration: 200,
                        ease: easePolyOut
                    }
                }}>
                {({
                    opacity,
                    top_left,
                    top_right,
                    bot_right,
                    bot_left,
                    background
                }) => (
                    <div
                        className="stripe-container"
                        style={{
                            position: 'absolute',
                            top: '90px',
                            opacity: opacity,
                            clipPath: `polygon(${top_left}% 0%, ${top_right}% 0, ${bot_right}% 100%, ${bot_left}% 100%)`,
                            background: `${background}`,
                            height: '85vh'
                        }}
                    />
                )}
            </Animate>
        ));
    return <ShowStripe />;
};

export default Stripes;
