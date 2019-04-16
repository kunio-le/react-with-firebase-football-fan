import React from 'react';

import Zoom from 'react-reveal/Zoom';

import Jersey from '../../Resources/images/jersey.jpg';

const PromotionContent = () => {
    return (
        <div className="promotion_animation">
            <Zoom>
                <div className="left">
                    <span>Win a</span>
                    <span>Jersey</span>
                </div>
            </Zoom>
            <Zoom>
                <div className="right">
                    <div style={{ background: `url(${Jersey}) no-repeat` }} />
                </div>
            </Zoom>
        </div>
    );
};

export default PromotionContent;
