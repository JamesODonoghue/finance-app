import { Authenticate } from '../Auth/Authenticate';
import { Home } from '../Home/Home';
import { Route } from 'react-router';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

export const Routes = () => (
    <BrowserRouter>
        <Route exact path="/" component={Authenticate} />
        <ProtectedRoute path="/home" component={Home} />
    </BrowserRouter>
);
