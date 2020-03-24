import React from 'react';
import { StyledInput } from './Styles';

export const Input = ({
    placeholder = 'email',
    type = 'email',
    onChange = () => {},
    children = undefined,
}) => {
    return (
        <StyledInput placeholder={placeholder} type={type} onChange={onChange}>
            {children}
        </StyledInput>
    );
};
