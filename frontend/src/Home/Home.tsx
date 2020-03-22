import React from 'react';
import auth from '../shared/utils/auth';
import { UserInfo } from '../App/UserInfo/UserInfo';
import { Accounts } from './Accounts/Accounts';
import './Home.css';
import { Activity } from './Activity/Activity';
import { Navbar } from '../App/Navbar/Navbar';
import { Switch, Route, useRouteMatch } from 'react-router';
import { Dashboard } from './Dashboard/Dashboard';

export const Home = () => {
    let user: any;
    let match = useRouteMatch();
    if (auth.getToken()) {
        user = auth.getUserInfo(auth.getToken() as string);
    }

    return (
        <div>
            <div className="home-container">
                <header>
                    <UserInfo
                        photo={user.photo}
                        displayName={user.displayName}
                    />
                </header>
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
                {/* <Activity /> */}
            </div>
            <Navbar />
        </div>
    );
};
