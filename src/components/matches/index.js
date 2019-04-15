import React from 'react';
import { Tag } from '../ui/misc';

import MatchBlock from './MatchBlock';

const Matches = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <div>
                    <Tag background="#0e1731" color="#ffffff" fontSize="2rem">
                        Matches
                    </Tag>
                </div>
                <div className="home_matches">
                    <MatchBlock />
                </div>
                <div>
                    <Tag
                        background="#ffffff"
                        color="#0e1731"
                        fontSize="1rem"
                        linkTo="/matches"
                        more={{ border: 'solid 1px #0e1731' }}>
                        See More Matches
                    </Tag>
                </div>
            </div>
        </div>
    );
};

export default Matches;
