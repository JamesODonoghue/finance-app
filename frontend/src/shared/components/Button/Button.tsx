import React from 'react';
import { StyledButton } from './Styles';
export const Button = ({
    className = 'btn-primary',
    icon = null,
    iconSize = 18,
    children = '',
    disabled = false,
    onClick = () => {},
}) => {
    const handleClick = () => {
        if (!disabled) {
            onClick();
        }
    };

    return (
        <StyledButton onClick={handleClick} disabled={disabled}>
            {icon}
            {children}
        </StyledButton>
    );
};
