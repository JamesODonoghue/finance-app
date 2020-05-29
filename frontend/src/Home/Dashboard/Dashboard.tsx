import React, { Fragment, useState, useEffect, useCallback } from 'react';
import useAuth from '../../context/auth';
import { StyledDashboard } from './Styles';
import { Balance } from './Balance/Balance';
import useItems from '../../shared/services/items';
import { exchangeToken, getWebhooksUrl } from '../../shared/services/api';
import { usePlaidLink } from 'react-plaid-link';
import { Button } from '../../shared/components/Button/Button';

export const Dashboard = () => {
    const { user } = useAuth();
    const { id: userId } = user;
    const { itemsByUser, getItemsByUser } = useItems();
    const [items, setItems] = useState([]);

    const [webhookUrl, setWebhookUrl] = useState<string | null>();

    const plaidConfig = {
        clientName: 'My Finance App',
        env: 'sandbox',
        product: ['auth', 'transactions'],
        publicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY as string,
    };

    useEffect(() => {
        const getUrl = async () => {
            const { data } = await getWebhooksUrl();
            setWebhookUrl(data);
        };
        getUrl();
    }, []);

    useEffect(() => {
        getItemsByUser(userId);
    }, [userId, getItemsByUser]);

    useEffect(() => {
        const newItems = itemsByUser[userId] || [];
        setItems(newItems);
    }, [userId, itemsByUser]);

    const onSuccess = useCallback(
        async (publicToken, metadata) => {
            const {
                institution: { institution_id: institutionId },
            } = metadata;
            await exchangeToken({
                publicToken,
                institutionId,
                userId,
            });
            getItemsByUser(userId);
        },
        [userId, getItemsByUser],
    );

    const { open } = usePlaidLink({
        ...plaidConfig,
        webhook: webhookUrl as string,
        onSuccess,
    });

    const accounts = items?.map(({ accounts }: { accounts: [] }) => {
        return accounts
            .filter((acc: any) => acc.type === 'depository')
            .map((account: any) => (
                <Balance>
                    <div>{account.name}</div>
                    <h1>{account.availableBalance}</h1>
                </Balance>
            ));
    });

    return (
        <Fragment>
            <h1 className="title">Welcome {user?.displayName}</h1>
            <Button primary={true} onClick={() => open()}>
                Add Account
            </Button>
            <StyledDashboard>{accounts}</StyledDashboard>
        </Fragment>
    );
};
