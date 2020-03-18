import React, { useState } from 'react';
import auth from '../shared/utils/auth';
import { UserInfo } from '../App/UserInfo/UserInfo';
import { Accounts } from './Accounts/Accounts';
import './Home.css';
import { Activity } from './Activity/Activity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar } from '../App/Navbar/Navbar';

export const Home = () => {
    let user: any;
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
                <section>
                    <Accounts />
                    {/* <Activity /> */}
                </section>
            </div>
            <Navbar />
        </div>
    );
};
