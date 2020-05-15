import React, { useState, useEffect } from 'react';
import {
    ItemTileHeader,
    ItemTileProps,
    ItemTileId,
    StyledItemTile,
} from './Styles';
import useInstitutions from '../../../shared/services/institutions';

export const PlaidItem = ({ active, item }: ItemTileProps) => {
    const [institution, setInstitution] = useState<any>();
    const { institutionsById, getInstitutionById } = useInstitutions();

    useEffect(() => {
        setInstitution(institutionsById[item.institutionId] || {});
    }, [institutionsById, item.institutionId]);

    useEffect(() => {
        getInstitutionById(item.institutionId);
    }, [getInstitutionById, item.institutionId]);

    return (
        <StyledItemTile active={active}>
            <ItemTileHeader>{institution && institution?.name}</ItemTileHeader>
            <ItemTileId>{item.id}</ItemTileId>
        </StyledItemTile>
    );
};
