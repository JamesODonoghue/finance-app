import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

export const StyledSvg = styled.svg`
    background-color: ${({ theme }) => theme.backgroundSecondary};
    border-radius: 1rem;
    width: 100%;
`;

export const StyledBarRect = styled.rect`
    fill: ${colors.G300};
    width: 30px;
    cursor: pointer;
    transition: 100ms all;

    :hover {
        fill: ${colors.G200};
    }
`;
