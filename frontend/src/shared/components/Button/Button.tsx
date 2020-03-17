import React from 'react';

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
        <button onClick={handleClick} className={className} disabled={disabled}>
            {icon}
            {children}
        </button>
    );
};
