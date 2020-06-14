import styled from 'styled-components';
import { colors } from '@atlaskit/theme';

export const StyledLandingNav = styled.nav`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
`;

export const StyledLandingNavLink = styled.a`
    margin-left: 5rem;
    color: ${colors.N600};

    :hover {
        color: ${colors.linkHover};
    }
`;

export const StyledMain = styled.div`
    display: flex;
    flex-wrap: wrap;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 10rem;
    justify-content: center;
    box-sizing: border-box;
`;

export const StyledMainTitle = styled.h1`
    font-size: 4rem;
`;

export const StyledLanding = styled.div`
    padding: 2rem;
`;
