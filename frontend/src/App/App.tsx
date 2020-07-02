import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../shared/utils/theme';
import BaseStyles from './BaseStyles';
import { ItemsProvider } from '../shared/services/items';
import useAuth from '../context/auth';
import { Home } from '../Home/Home';
import { TransactionsProvider } from '../shared/services/transactions';
import Sockets from '../shared/components/Sockets/Sockets';
import { Landing } from '../Landing/Landing';

export const App = () => {
    const { user } = useAuth();
    const themeMode = lightTheme;
    return (
        <Fragment>
            <ThemeProvider theme={themeMode}>
                <BaseStyles />
                {user ? (
                    <TransactionsProvider>
                        <ItemsProvider>
                            <Sockets />
                            <Home />
                        </ItemsProvider>
                    </TransactionsProvider>
                ) : (
                    <Landing />
                )}
            </ThemeProvider>
        </Fragment>
    );
};
