import styled from 'styled-components';

export const StyledTransactionList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1rem;
    row-gap: 1rem;
    height: calc(100vh - 400px);
    overflow: auto;
`;
