import React from 'react';
import { TileList } from './TileList';

export const Home = () => {
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
