import React from 'react';

import { Logo } from '../ui/icons';
import MancityLogo from '../../Resources/images/logos/manchester_city_logo.png';

const Footer = () => {
    return (
        <footer className="bck_blue">
            <div className="img_cover">
                <Logo
                    width="72px"
                    height="72px"
                    image={MancityLogo}
                    linkTo="/"
                />
            </div>
            <div className="footer_discl">
                Manchester City - Copy right 2019 - All right Reserved
            </div>
        </footer>
    );
};

export default Footer;
