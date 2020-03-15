import React from 'react';

export interface TileProps {
    title?: string;
    balance?: string;
}
export const Tile = ({
    title = 'Sample Account',
    balance = '$3,456.00',
}: TileProps) => {
    return (
        <div className="tile-container">
            <h3 className="tile-header">{title}</h3>
            <h2 className="tile-body">{balance}</h2>
        </div>
    );
};
