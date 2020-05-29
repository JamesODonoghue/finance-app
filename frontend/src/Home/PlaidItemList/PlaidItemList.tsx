import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { Button } from '../../shared/components/Button/Button';
import { usePlaidLink } from 'react-plaid-link';
import {
    exchangeToken,
    clearItems,
    clearAllAccounts,
} from '../../shared/services/api';
import useItems from '../../shared/services/items';
import useAuth from '../../context/auth';
import { AccountCarousel } from '../../shared/components/Carousel/Carousel';
import { getPlaidConfig } from '../../shared/config/plaidConfig';

export const PlaidItemList = () => {
    const {
        user: { id: userId },
    } = useAuth();
    const { itemsByUser, getItemsByUser } = useItems();

    const [items, setItems] = useState([]);

    useEffect(() => {
        getItemsByUser(userId);
    }, [userId, getItemsByUser]);

    useEffect(() => {
        const newItems = itemsByUser[userId] || [];
        setItems(newItems);
    }, [userId, itemsByUser]);

    const onSuccess = useCallback(
        async (publicToken, metadata) => {
            const {
                institution: { institution_id: institutionId },
            } = metadata;
            await exchangeToken({
                publicToken,
                institutionId,
                userId,
            });
            getItemsByUser(userId);
        },
        [userId, getItemsByUser],
    );

    // const { open } = usePlaidLink({ ...config, onSuccess });

    const handleClearItems = async () => {
        await clearItems();
        getItemsByUser(userId);
    };

    const handleClearAllAccounts = async () => {
        await clearAllAccounts();
    };

    return (
        <Fragment>
            <h1>Your Accounts</h1>
            <AccountCarousel items={items}></AccountCarousel>
            <div style={{ display: 'flex' }}>
                {/* <Button primary={true} onClick={() => open()}>
                    Add Account
                </Button> */}
                <Button primary={false} onClick={handleClearItems}>
                    Clear items
                </Button>
                <Button primary={false} onClick={handleClearAllAccounts}>
                    Clear all accounts
                </Button>
            </div>

            {/* <StyledItemList>
                {items?.map((item: any) => (
                    <PlaidItem item={item}></PlaidItem>
                ))}
            </StyledItemList> */}
        </Fragment>
    );
};
