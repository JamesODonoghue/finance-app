import styled from 'styled-components';

export const StyledSidePanel = styled.nav`
    background: ${({ theme }) => theme.backgroundSecondary};
    top: 0;
    left: 0;
    height: 100vh;
    width: 250px;
    flex-direction: column;
    padding: 10rem 0;
    display: flex;
    box-sizing: border-box;
`;

export const StyledNavLink = styled.div`
    display: contents;

    a {
        padding: 0.5rem 1rem;
        border-radius: 0.3rem;
        transition: all 150ms;
        margin: 0 1rem 1rem 1rem;
        color: ${({ theme }): string => theme.color};

        &:hover {
            background-color: ${({ theme }): string => theme.buttonHover};
        }
    }
`;
