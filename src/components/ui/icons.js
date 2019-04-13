import React from 'react';

import { Link } from 'react-router-dom';

export const Logo = props => {
    const Template = () => (
        <div
            className="img_cover"
            style={{
                width: props.width,
                height: props.height,
                background: `url(${props.image}) no-repeat`
            }}
        />
    );

    if (props.linkTo) {
        return (
            <Link to={props.linkTo}>
                <Template />
            </Link>
        );
    } else {
        return <Template />;
    }
};
