import { color, mixin } from '../../../shared/utils/styles';
import styled from 'styled-components';
import { Item } from '../../../types/item';

export interface ItemTileProps {
    item?: Item;
    active?: boolean;
}

export const StyledItemTile = styled.div<ItemTileProps>`
    ${mixin.borderRadius};
    padding: 2rem;
    height: 175px;
    background: ${(props: ItemTileProps) =>
        props.active ? color.blueDark : color.white};
    color: ${(props: ItemTileProps) =>
        props.active ? color.white : color.blueDark};
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
