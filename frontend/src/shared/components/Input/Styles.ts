import { color } from './../../utils/styles';
import styled from 'styled-components';

export const StyledInput = styled.input`
    margin-bottom: 1.5rem;
    padding: 1rem;
    border: 2px solid #fff;
    border-radius: 0.6rem;
    font-size: 1rem;
    font-family: inherit;
    font-weight: bold;
    color: inherit;
    box-sizing: content-box;
    transition: 100ms border;
    &:focus {
        outline-width: 0;
        box-sizing: border-box;
        border: 2px solid ${color.blueDark};
    }
`;
