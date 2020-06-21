import styled from 'styled-components';

// export const StyledDashboard = styled.div`
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
//     column-gap: 1rem;
//     row-gap: 1rem;
// `;

export const StyledDashboard = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-template-rows: repeat(6, 1fr);
    column-gap: 1rem;
    row-gap: 1rem;
    height: calc(100vh - 12rem);
`;

export const StyledDashboardTile = styled.div`
    padding: 2rem;
    background: ${({ theme }) => theme.backgroundSecondary};
`;

export const StyledDashboardTileFull = styled(StyledDashboardTile)`
    grid-row: 1 / 4;
`;

export const StyledDashboardTileCol = styled(StyledDashboardTile)`
    grid-row-end: span 3;
`;
