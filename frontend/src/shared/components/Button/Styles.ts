import { color } from './../../utils/styles';
import styled from 'styled-components';

export const StyledButton = styled.button`
    padding: 1em;
    border: 0;
    background-color: ${color.blueDark};
    color: ${color.textWhite};
    cursor: pointer;
    font-family: inherit;
    font-weight: bold;
    font-size: 1rem;
    border-radius: 0.6rem;
`;
