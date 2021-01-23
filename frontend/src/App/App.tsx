import React, { FC, Fragment } from 'react';
import { ItemsProvider } from '../shared/services/items';
import useAuth from '../context/auth';
import { Home } from '../Home/Home';
import { TransactionsProvider } from '../shared/services/transactions';
import Sockets from '../shared/components/Sockets/Sockets';
import { Landing } from '../Landing/Landing';
import { NotificationsProvider } from '../shared/services/notifications';

export const App: FC = () => {
    const { user } = useAuth();
    return (
        <Fragment>
            {user ? (
                <TransactionsProvider>
                    <ItemsProvider>
                        <NotificationsProvider>
                            <Sockets />
                            <Home />
                        </NotificationsProvider>
                    </ItemsProvider>
                </TransactionsProvider>
            ) : (
                <Landing />
            )}
        </Fragment>
    );
};
