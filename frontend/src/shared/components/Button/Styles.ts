import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import { ButtonProps } from './Button';

export const StyledButton = styled('button')<ButtonProps>`
    padding: 0.5rem 1em;
    border: 0;
    background-color: ${({ theme }): string => theme.backgroundSecondary};
    color: ${({ theme }): string => theme.color};
    cursor: pointer;
    font-family: inherit;
    font-weight: 700;
    font-size: 1rem;
    border-radius: 0.3rem;
    transition: all 150ms;

    &:hover {
        background-color: ${({ theme }): string => theme.buttonHover};
    }
`;

export const StyledLoginButton = styled.button`
    padding: 1rem;
    border: 0;
    background-color: ${colors.B300};
    color: #fff;
    cursor: pointer;
    font-family: inherit;
    font-weight: 700;
    font-size: 1rem;
    border-radius: 0.3rem;
    transition: all 150ms;

    &:hover {
        background-color: ${colors.B200};
    }
`;
