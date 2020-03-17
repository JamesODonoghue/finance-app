import React, { Children } from 'react';
import { prependOnceListener } from 'cluster';

export interface TileProps {
    title?: string;
    balance?: string;
}
export const Tile = (props: any) => {
    return <div className="tile-container">{props.children}</div>;
};
