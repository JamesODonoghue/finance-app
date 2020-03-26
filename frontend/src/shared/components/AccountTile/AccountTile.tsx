import React from 'react';
import {
    StyledAccountTile,
    AccountTileHeader,
    AccountTileBalance,
    AccountTileId,
    AccountTileProps,
} from './Styles';

export const AccountTile = ({ active }: AccountTileProps) => {
    return (
        <StyledAccountTile active={active}>
            <AccountTileHeader>Simple Bank</AccountTileHeader>
            <AccountTileBalance>72,300.00 USD</AccountTileBalance>
            <AccountTileId>0009872365</AccountTileId>
        </StyledAccountTile>
    );
};
