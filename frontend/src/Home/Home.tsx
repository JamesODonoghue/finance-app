import React from 'react';
import { verifyToken, getToken } from '../shared/utils/auth';
import { UserInfo } from '../App/UserInfo/UserInfo';
import { Accounts } from './Accounts/Accounts';
import { Activity } from './Activity/Activity';
import { Navbar } from '../App/Navbar/Navbar';
import { Switch, Route, useRouteMatch } from 'react-router';
import { Dashboard } from './Dashboard/Dashboard';
import './Home.css';

export const Home = () => {
    let user: any;
    let match = useRouteMatch();
    let token = getToken() || '';
    if (getToken()) {
        user = verifyToken(token);
    }

    return (
        <div>
            <div className="home-container">
                <UserInfo photo={user.photo} displayName={user.displayName} />
                <Switch>
                    <Route path={`${match.path}/dashboard`}>
                        <Dashboard />
                    </Route>
                    <Route path={`${match.path}/accounts`}>
                        <Accounts />
                    </Route>
                    <Route path={`${match.path}/activity`}>
                        <Activity />
                    </Route>
                </Switch>
            </div>
            <Navbar />
        </div>
    );
};
