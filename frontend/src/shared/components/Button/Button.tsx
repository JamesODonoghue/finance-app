import React, { ReactElement } from 'react';
import { StyledButton } from './Styles';

export interface ButtonProps {
    icon?: string;
    disabled?: boolean;
    children: string;
    onClick?: () => void;
}
export const Button = ({
    children,
    disabled = false,
    onClick,
}: ButtonProps): ReactElement => {
    const handleClick = (): void => {
        if (!disabled) {
            onClick && onClick();
        }
    };

    return (
        <StyledButton onClick={handleClick} disabled={disabled}>
            {children}
        </StyledButton>
    );
};
