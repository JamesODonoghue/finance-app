import { color } from './../../utils/styles';
import styled from 'styled-components';

interface IButtonProps {
    primary?: boolean;
}
export const StyledButton = styled('button')<IButtonProps>`
    padding: 0.5rem 1em;
    border: 0;
    background-color: ${(props) =>
        props.primary ? color.blueDark : props.theme.backgroundSecondary};
    color: ${({ theme }) => theme.color};
    cursor: pointer;
    font-family: inherit;
    font-weight: 500;
    font-size: 1rem;
    border-radius: 0.3rem;
    transition: all 150ms;

    &:hover {
        background-color: ${({ theme }) => theme.buttonHover};
    }
`;
