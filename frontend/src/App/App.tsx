import React from 'react';
// import './App.css';
import { ThemeProvider } from 'styled-components';
import { Routes } from './Routes';
import { darkTheme } from '../shared/utils/theme';
import BaseStyles from './BaseStyles';

export const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <BaseStyles />
            <Routes />
        </ThemeProvider>
    );
};
