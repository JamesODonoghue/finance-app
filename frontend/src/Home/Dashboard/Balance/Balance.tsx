import React, { ReactElement, ReactNode } from 'react';
import { StyledBalance } from './Styles';

export const Balance = ({
    children,
}: {
    children: ReactNode;
}): ReactElement => <StyledBalance>{children}</StyledBalance>;
