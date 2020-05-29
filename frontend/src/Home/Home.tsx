import React, { Fragment } from 'react';
import { Activity } from './Activity/Activity';
import { Switch, Route } from 'react-router';
import { Dashboard } from './Dashboard/Dashboard';
import { PlaidItemList } from './PlaidItemList/PlaidItemList';
import { HomeScreen } from './Styles';

export const Home = () => {
    return (
        <Fragment>
            <HomeScreen>
                {/* <UserInfo photo={user.photo} displayName={user.displayName} /> */}
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
