import React, { useState } from 'react';
import { TileList } from './TileList';
import auth from '../helpers/auth';
import { Navbar } from './Navbar';

export const Home = () => {
    let user: any;
    if (auth.getToken()) {
        user = auth.getUserInfo(auth.getToken() as string);
    }

    return (
        <div className="container">
            <header>
                <h1>BLNCE</h1>
                <Navbar />
                <div className="header-user-info">
                    <div className="user-name">{user && user.displayName}</div>
                    <img className="user-photo" src={user.photo}></img>
                </div>
            </header>
            <section className="body-container">
                <div>
                    <h2>Activity</h2>
                    <TileList />
                </div>
                <div>
                    <h2>Accounts</h2>
                    <TileList />
                </div>
                <div></div>
            </section>
            <div className="content"></div>
        </div>
    );
};
