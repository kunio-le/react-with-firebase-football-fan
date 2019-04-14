import React, { Fragment } from 'react';

import { Animate } from 'react-move';
import { easePolyOut } from 'd3-ease';

const Text = () => {
    const Number = () => (
        <Animate
            show={true}
            start={{ opacity: [0], rotate: [0] }}
            enter={{
                opacity: [1],
                rotate: [360],
                timing: { duration: 1000, ease: easePolyOut }
            }}>
            {({ opacity, rotate }) => (
                <div
                    className="featured_text"
                    style={{
                        opacity,
                        transform: `translate(32vw, 15vh) rotateY(${rotate}deg)`
                    }}>
                    3
                </div>
            )}
        </Animate>
    );

    const textContent = [
        { content: 'league', delay: 0, translateY: 50 },
        { content: 'Championships', delay: 500, translateY: 65 }
    ];

    const TextLine = () =>
        textContent.map((text, i) => (
            <Animate
                key={i}
                show={true}
                start={{
                    content: text.content,
                    opacity: [0],
                    translateY: [text.translateY],
                    translateX: [0]
                }}
                enter={{
                    opacity: [1],
                    translateY: [text.translateY],
                    translateX: [32],
                    timing: {
                        content: [text.content],
                        delay: [text.delay],
                        duration: 1000,
                        ease: easePolyOut
                    }
                }}>
                {({ content, opacity, translateY, translateX }) => (
                    <div
                        className="featured_textline"
                        style={{
                            opacity: [opacity],
                            transform: `translate(${translateX}vw, ${translateY}vh)`
                        }}>
                        {content}
                    </div>
                )}
            </Animate>
        ));

    return (
        <Fragment>
            <div className="featured_number">
                <Number />
            </div>
            <TextLine />
        </Fragment>
    );
};

export default Text;
