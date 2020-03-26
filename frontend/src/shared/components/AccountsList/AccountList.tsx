import React from 'react';
import { StyledAccountList } from './Styles';
import { AccountTile } from '../AccountTile/AccountTile';
import { Button } from '../Button/Button';
export const AccountList = () => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
            >
                <h1 style={{ marginRight: '3rem' }}>Your Accounts</h1>
                <Button primary={false}>Add Account</Button>
            </div>

            <StyledAccountList>
                <AccountTile active></AccountTile>
                <AccountTile></AccountTile>
                <AccountTile></AccountTile>
            </StyledAccountList>
        </div>
    );
};
