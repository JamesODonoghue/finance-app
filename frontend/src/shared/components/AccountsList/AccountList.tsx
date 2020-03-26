import React from 'react';
import { StyledAccountList } from './Styles';
import { AccountTile } from '../AccountTile/AccountTile';
export const AccountList = () => {
    return (
        <StyledAccountList>
            <AccountTile active></AccountTile>
            <AccountTile></AccountTile>
            <AccountTile></AccountTile>
        </StyledAccountList>
    );
};
