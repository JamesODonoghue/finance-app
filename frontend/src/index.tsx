import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App/App';
import * as serviceWorker from './serviceWorker';
import './fonts/Dosis/Dosis-VariableFont_wght.ttf';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

import {
    faCreditCard,
    faChartBar,
    faUserCircle,
} from '@fortawesome/free-regular-svg-icons';

import {
    faPlane,
    faUtensils,
    faBiking,
    faExchangeAlt,
    faHandHoldingUsd,
} from '@fortawesome/free-solid-svg-icons';

import { AuthProvider } from './context/auth';
import { BrowserRouter as Router } from 'react-router-dom';

library.add(
    faCreditCard,
    faChartBar,
    faDollarSign,
    faUserCircle,
    faPlane,
    faUtensils,
    faBiking,
    faExchangeAlt,
    faHandHoldingUsd,
);

ReactDOM.render(
    <Router>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Router>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
