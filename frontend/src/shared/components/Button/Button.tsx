import React, { ReactElement } from 'react';

export interface ButtonProps {
    icon?: string;
    disabled?: boolean;
    children: string;
    onClick?: () => void;
}
export const Button = ({ children, disabled = false, onClick }: ButtonProps): ReactElement => {
    const handleClick = (): void => {
        if (!disabled) {
            onClick && onClick();
        }
    };

    return (
        <button onClick={handleClick} disabled={disabled}>
            {children}
        </button>
    );
};
