import React from 'react';

import Enroll from './Enroll';
import PromotionContent from './PromotionContent';

const Promotion = () => {
    return (
        <div className="promotion_wrapper">
            <div className="container">
                <PromotionContent />
                <Enroll />
            </div>
        </div>
    );
};

export default Promotion;
