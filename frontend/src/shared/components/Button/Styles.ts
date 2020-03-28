import { color } from './../../utils/styles';
import styled from 'styled-components';

interface IButtonProps {
    primary?: boolean;
}
export const StyledButton = styled('button')<IButtonProps>`
    padding: 1em;
    border: 0;
    background-color: ${props =>
        props.primary ? color.blueDark : color.btnSecondary};
    color: ${props => (props.primary ? color.textWhite : color.textSecondary)};
    cursor: pointer;
    font-family: inherit;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 0.6rem;
    transition: background-color 150ms;

    &:hover {
        background-color: ${props =>
            props.primary ? '' : color.btnSecondaryHover};
    }
`;
