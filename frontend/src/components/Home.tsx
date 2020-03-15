import React from 'react';
import auth from '../helpers/auth';
import { TileList } from './TileList';

export const Home = () => {
    // let user = auth.decodeToken(auth.getToken() || '');

    return (
        <div className="home-container">
            <header className="header-container">
                <h1>Overview</h1>
            </header>
            <section className="body-container">
                <TileList />
            </section>
            <div className="content"></div>
        </div>
    );
};
