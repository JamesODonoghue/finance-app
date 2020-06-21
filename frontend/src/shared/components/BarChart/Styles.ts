import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

export const StyledSvg = styled.svg`
    width: 100%;
`;

export const StyledSpending = styled.div`
    background-color: ${({ theme }) => theme.backgroundSecondary};
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
