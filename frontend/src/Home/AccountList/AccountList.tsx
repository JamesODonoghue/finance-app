import React, { useState, useEffect, ReactElement } from 'react';
import useAuth from '../../context/auth';
import useItems from '../../shared/services/items';
import { Item } from '../../types/item';
import { Balance } from '../Dashboard/Balance/Balance';
import { Account } from '../../types/account';

export const AccountList = (): ReactElement => {
    const { user } = useAuth();
    const userId = user ? user.id : '';
    const { itemsByUser, getItemsByUser } = useItems();
    const [items, setItems] = useState<Item[]>([]);

    useEffect((): void => {
        getItemsByUser(userId);
    }, [userId, getItemsByUser]);

    useEffect((): void => {
        const newItems = itemsByUser[userId] || [];
        setItems(newItems);
    }, [userId, itemsByUser]);

    const accounts = items?.map(
        ({ accounts }: { accounts: Account[] }): ReactElement[] =>
            accounts
                .filter((acc) => acc.type === 'depository')
                .map((account) => (
                    <Balance key={account.plaidAccountId}>
                        <div>{account.name}</div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 400 }}>
                            {new Intl.NumberFormat('en-us', {
                                style: 'currency',
                                currency: 'USD',
                            }).format(account.availableBalance)}
                        </h1>
                    </Balance>
                )),
    );

    return (
        <div>
            <h1>Accounts</h1>
            {accounts}
        </div>
    );
};
