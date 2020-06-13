import React, { Fragment, useEffect, useState } from 'react';
import { Activity } from './Activity/Activity';
import { Switch, Route } from 'react-router';
import { Dashboard } from './Dashboard/Dashboard';
import { PlaidItemList } from './PlaidItemList/PlaidItemList';
import { HomeScreen, HomeHeader } from './Styles';
// import {
//     getWebhooksUrl,
//     exchangeToken,
//     clearAllAccounts,
//     clearAllItems,
// } from '../shared/services/api';
// import { usePlaidLink } from 'react-plaid-link';
import { Button } from '../shared/components/Button/Button';
// import useItems from '../shared/services/items';
import useAuth from '../context/auth';
import { useLink } from '../shared/services/link';

const MORNING = 'Good Morning';
const AFTERNOON = 'Good Afternoon';
const EVENING = 'Good Evening';

export const Home = () => {
    const { user } = useAuth();
    const { open } = useLink();
    const [hour, setHour] = useState(10);
    useEffect(() => {
        setHour(new Date().getHours());
    }, []);

    const getFullGreeting = () => {
        let firstName = user?.displayName.split(' ')[0];

        return (
            <div style={{ fontSize: '3rem' }}>
                <span style={{ fontWeight: 400 }}>
                    {hour < 12 ? MORNING : hour < 15 ? AFTERNOON : EVENING}
                </span>{' '}
                {firstName}
            </div>
        );
    };
    return (
        <Fragment>
            <HomeScreen>
                <HomeHeader>
                    {getFullGreeting()}
                    <Button onClick={() => open()}>Add Account</Button>
                    {/* <Button
                        style={{ marginRight: '2rem' }}
                        primary={false}
                        onClick={clearAllAccounts}
                    >
                        Clear Accounts
                    </Button>
                    <Button primary={false} onClick={clearAllItems}>
                        Clear Items
                    </Button> */}
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
