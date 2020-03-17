import React, { useState } from 'react';
import auth from '../shared/utils/auth';
import { UserInfo } from '../App/UserInfo/UserInfo';
import { Accounts } from './Accounts/Accounts';
import './Home.css';
import { Activity } from './Activity/Activity';

export const Home = () => {
    let user: any;
    if (auth.getToken()) {
        user = auth.getUserInfo(auth.getToken() as string);
    }

    return (
        <div className="home-container">
            <header>
                <div className="home-title">Merius</div>
                <UserInfo photo={user.photo} displayName={user.displayName} />
            </header>
            <section>
                <Accounts />
                <Activity />
            </section>
        </div>
    );
};
