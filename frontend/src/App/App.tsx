import React, { Fragment } from 'react';
import BaseStyles from './BaseStyles';
import { ItemsProvider } from '../shared/services/items';
import { InstitutionsProvider } from '../shared/services/institutions';
import useAuth from '../context/auth';
import { Authenticate } from '../Auth/Authenticate';
import { Home } from '../Home/Home';
import { TransactionsProvider } from '../shared/services/transactions';
import Sockets from '../shared/components/Sockets/Sockets';

export const App = () => {
    const { user } = useAuth();
    return (
        <Fragment>
            <BaseStyles />
            {user ? (
                <TransactionsProvider>
                    <InstitutionsProvider>
                        <ItemsProvider>
                            <Sockets />
                            <Home />
                        </ItemsProvider>
                    </InstitutionsProvider>
                </TransactionsProvider>
            ) : (
                <Authenticate />
            )}
        </Fragment>
    );
};
