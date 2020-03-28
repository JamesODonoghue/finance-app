import { color, mixin } from './../../utils/styles';
import styled from 'styled-components';

export type AccountTileProps = {
    active?: boolean;
};

export const StyledAccountTile = styled.div`
    ${mixin.borderRadius};
    padding: 2rem;
    min-width: 300px;
    height: 175px;
    background: ${(props: AccountTileProps) =>
        props.active ? color.blueDark : color.textWhite};
    color: ${(props: AccountTileProps) =>
        props.active ? color.textWhite : color.blueDark};
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    font-size: 1.6rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    cursor: pointer;
    transition: 200ms;

    /* &:hover {
        transform: translateY(-0.6rem);
    } */
`;

export const AccountTileHeader = styled.div``;

export const AccountTileBalance = styled.div`
    font-size: 2rem;
    font-weight: bold;
`;

export const AccountTileId = styled.div`
    color: ${color.textLight};
`;
