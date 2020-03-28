import React, { useCallback, useState } from 'react';
import { StyledAccountList } from './Styles';
import { AccountTile } from '../AccountTile/AccountTile';
import { Button } from '../Button/Button';
import { usePlaidLink } from 'react-plaid-link';
import { exchangeToken, getItemsByUser } from '../../services/api';
import { verifyToken, getToken } from '../../utils/auth';

interface IUserToken {
    id: string;
    displayName: string;
    photo: string;
    iat: number;
    exp: number;
}

export const AccountList = () => {
    const userToken = getToken();
    const { id: userId } = verifyToken(userToken) as IUserToken;
    const [items, setItems] = useState([]);

    const onSuccess = useCallback(async (publicToken, metadata) => {
        const { institutionId = '' } = metadata;
        await exchangeToken({
            publicToken,
            institutionId,
            userId,
        });
        let result = await getItemsByUser(userId);
        let json = await result.json();
        setItems(json);
    }, []);
    const config = {
        clientName: 'Your app name',
        env: 'sandbox',
        product: ['auth', 'transactions'],
        publicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY as string,
        onSuccess,
    };
    const { open, ready, error } = usePlaidLink(config);

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '1rem',
                }}
            >
                <h1 style={{ marginRight: '3rem' }}>Your Accounts</h1>
                <Button primary={false} onClick={() => open()}>
                    Add Account
                </Button>
            </div>

            <StyledAccountList>
                <AccountTile active></AccountTile>
                <AccountTile></AccountTile>
                <AccountTile></AccountTile>
            </StyledAccountList>
        </div>
    );
};
