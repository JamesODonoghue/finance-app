import React from 'react';
import './App.css';
import { Route } from 'react-router';
import { Home } from './components/Home';

import { ProtectedRoute } from './components/ProtectedRoute';
import { Authenticate } from './components/Authenticate';

export const App = () => {
    return (
        <div className="app">
            <div className="main-content">
                <Route exact path="/" component={Authenticate} />
                <ProtectedRoute path="/home" component={Home} />
            </div>
        </div>
    );
};
