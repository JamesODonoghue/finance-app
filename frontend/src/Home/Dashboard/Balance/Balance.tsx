import React, { FunctionComponent } from 'react';
import { StyledBalance } from './Styles';

export const Balance: FunctionComponent = ({ children }) => {
    return <StyledBalance>{children}</StyledBalance>;
};
