import React, { Fragment } from 'react';

import { Tag } from '../ui/misc';

const PlayerText = () => {
    return (
        <Fragment>
            {['Meet', 'The', 'Players'].map((text, i) => (
                <div key={i}>
                    <Tag
                        background="#0e1731"
                        color="#ffffff"
                        fontSize="4em"
                        more={{
                            // display: 'block',
                            marginBottom: '3vh',
                            padding: '5px 10px'
                        }}>
                        {text}
                    </Tag>
                </div>
            ))}

            <div>
                <Tag
                    background="#ffffff"
                    color="#0e1731"
                    fontSize="2em"
                    linkTo="/the-team"
                    more={{ border: 'solid 1px #0e1731', marginTop: '4vh' }}>
                    Meet All Players
                </Tag>
            </div>
        </Fragment>
    );
};

export default PlayerText;
