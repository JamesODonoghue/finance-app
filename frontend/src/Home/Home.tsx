import React, { Fragment, useEffect, useCallback, useState } from 'react';
import { Activity } from './Activity/Activity';
import { Switch, Route } from 'react-router';
import { Dashboard } from './Dashboard/Dashboard';
import { PlaidItemList } from './PlaidItemList/PlaidItemList';
import { HomeScreen, HomeHeader } from './Styles';
import {
    getWebhooksUrl,
    exchangeToken,
    clearAllAccounts,
} from '../shared/services/api';
import { usePlaidLink } from 'react-plaid-link';
import { Button } from '../shared/components/Button/Button';
import useItems from '../shared/services/items';
import useAuth from '../context/auth';

export const Home = () => {
    const { user } = useAuth();
    const { id: userId } = user;
    const { getItemsByUser } = useItems();
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
    return (
        <Fragment>
            <HomeScreen>
                {/* <UserInfo photo={user.photo} displayName={user.displayName} /> */}
                <HomeHeader>
                    <Button primary={true} onClick={() => open()}>
                        Add Account
                    </Button>
                    <Button primary={false} onClick={clearAllAccounts}>
                        Clear Accounts
                    </Button>
                </HomeHeader>
                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route path="/items">
                        <PlaidItemList />
                    </Route>
                    <Route path="/activity">
                        <Activity />
                    </Route>
                </Switch>
            </HomeScreen>
            {/* <Navbar /> */}
        </Fragment>
    );
};
