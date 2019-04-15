import React from 'react';

import { Animate } from 'react-move';
import { easePolyOut } from 'd3-ease';

import Otamendi from '../../Resources/images/players/Otamendi.png';

import Card from '../../components/ui/Card';

const PlayerCard = props => {
    const cardsPosition = [
        {
            bottom: 16,
            left: 34
        },
        {
            bottom: 12,
            left: 26
        },
        {
            bottom: 8,
            left: 18
        },
        {
            bottom: 4,
            left: 10
        }
    ];
    return cardsPosition.map((card, i) => (
        <Animate
            key={i}
            show={props.isShow}
            start={{ bottom: 0, left: 0 }}
            enter={{
                bottom: [card.bottom],
                left: [card.left],
                timing: { duration: 500, ease: easePolyOut }
            }}>
            {({ bottom, left }) => (
                <div
                    style={{
                        position: 'absolute',
                        left: `${left}vw`,
                        bottom: `${bottom}vh`
                    }}>
                    <Card
                        thmb={Otamendi}
                        number="30"
                        name="Otamendi"
                        lastName="Nicolas"
                    />
                </div>
            )}
        </Animate>
    ));
};

export default PlayerCard;
