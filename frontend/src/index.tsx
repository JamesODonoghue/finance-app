import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faDollarSign,
    faPlane,
    faUtensils,
    faBiking,
    faExchangeAlt,
    faHandHoldingUsd,
    faList,
} from '@fortawesome/free-solid-svg-icons';
import './assets/main.css';
import './assets/font/stylesheet.css';
import { faCreditCard, faChartBar, faUserCircle } from '@fortawesome/free-regular-svg-icons';

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import * as serviceWorker from './serviceWorker';
import { App } from './App/App';

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
    faList,
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
