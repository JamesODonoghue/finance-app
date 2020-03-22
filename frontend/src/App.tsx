import React from 'react';
import './App.css';
import { Route } from 'react-router';
import { Home } from './Home/Home';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { Authenticate } from './Auth/Authenticate';

export const App = () => {
    return (
        <div className="app">
            <Route exact path="/" component={Authenticate} />
            <ProtectedRoute path="/home" component={Home} />
        </div>
    );
};
