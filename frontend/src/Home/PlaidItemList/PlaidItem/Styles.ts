import { color, mixin } from '../../../shared/utils/styles';
import styled from 'styled-components';

export type ItemTileProps = {
    item?: any;
    active?: boolean;
};

export const StyledItemTile = styled.div<ItemTileProps>`
    ${mixin.borderRadius};
    padding: 2rem;
    height: 175px;
    background: ${(props: ItemTileProps) =>
        props.active ? color.blueDark : color.textWhite};
    color: ${(props: ItemTileProps) =>
        props.active ? color.textWhite : color.blueDark};
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    font-size: 1.6rem;
    cursor: pointer;
    transition: 200ms;

    /* &:hover {
        transform: translateY(-0.6rem);
    } */
`;

export const ItemTileHeader = styled.div``;

export const ItemTileId = styled.div`
    color: ${color.textLight};
`;
