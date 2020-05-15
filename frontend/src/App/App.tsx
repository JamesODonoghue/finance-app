import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../shared/utils/theme';
import BaseStyles from './BaseStyles';
import { ItemsProvider } from '../shared/services/items';
import { InstitutionsProvider } from '../shared/services/institutions';
import useAuth from '../context/auth';
import { Authenticate } from '../Auth/Authenticate';
import { Home } from '../Home/Home';

export const App = () => {
    const { user } = useAuth();
    return (
        <Fragment>
            {user ? (
                <ThemeProvider theme={lightTheme}>
                    <InstitutionsProvider>
                        <ItemsProvider>
                            <BaseStyles />
                            <Home />
                        </ItemsProvider>
                    </InstitutionsProvider>
                </ThemeProvider>
            ) : (
                <Authenticate />
            )}
        </Fragment>
    );
};
