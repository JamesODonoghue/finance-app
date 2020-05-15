import styled from 'styled-components';

export const StyledItemList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    column-gap: 1rem;
    row-gap: 1rem;
`;
