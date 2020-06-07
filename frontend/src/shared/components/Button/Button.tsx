import React from 'react';
import { StyledButton } from './Styles';
export const Button = ({
    icon = null,
    children = '',
    disabled = false,
    primary = false,
    style = {},
    onClick = () => {},
}) => {
    const handleClick = () => {
        if (!disabled) {
            onClick();
        }
    };

    return (
        <StyledButton
            onClick={handleClick}
            disabled={disabled}
            primary={primary}
            style={style}
        >
            {icon}
            {children}
        </StyledButton>
    );
};
