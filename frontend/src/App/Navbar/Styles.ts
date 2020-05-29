import styled from 'styled-components';

export const StyledNavbar = styled.nav`
    position: fixed;
    background: ${({ theme }) => theme.backgroundSecondary};
    top: 0;
    left: 0;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;
