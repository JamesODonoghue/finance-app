import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../shared/utils/theme';
import BaseStyles from './BaseStyles';
import { ItemsProvider } from '../shared/services/items';
import { InstitutionsProvider } from '../shared/services/institutions';
import useAuth from '../context/auth';
import { Authenticate } from '../Auth/Authenticate';
import { Home } from '../Home/Home';
import { TransactionsProvider } from '../shared/services/transactions';
import { ModeToggle } from './ModeToggle/ModeToggle';
import { useDarkMode } from '../shared/hooks/useDarkMode';

export const App = () => {
    const { user } = useAuth();
    const [theme, themeToggler] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    return (
        <Fragment>
            <ModeToggle handleChange={themeToggler}></ModeToggle>
            {user ? (
                <ThemeProvider theme={themeMode}>
                    <TransactionsProvider>
                        <InstitutionsProvider>
                            <ItemsProvider>
                                <BaseStyles />
                                <Home />
                            </ItemsProvider>
                        </InstitutionsProvider>
                    </TransactionsProvider>
                </ThemeProvider>
            ) : (
                <Authenticate />
            )}
        </Fragment>
    );
};
