import React, { ReactElement, ReactChildren } from 'react';
import { StyledInput } from './Styles';

interface InputProps {
    placeholder?: string;
    type?: string;
    onChange?: () => void;
    children: ReactChildren;
}
export const Input = ({
    placeholder = 'email',
    type = 'email',
    onChange,
    children,
}: InputProps): ReactElement => {
    return (
        <StyledInput placeholder={placeholder} type={type} onChange={onChange}>
            {children}
        </StyledInput>
    );
};
