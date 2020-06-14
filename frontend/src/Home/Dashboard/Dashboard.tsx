import React, { Fragment, useState, useEffect, ReactElement } from 'react';
import useAuth from '../../context/auth';
import { StyledDashboard } from './Styles';
import { Balance } from './Balance/Balance';
import useItems from '../../shared/services/items';
import { BarChartContainer } from '../../shared/components/BarChart/BarChart';
import { Item } from '../../types/item';
import { Account } from '../../types/account';
export const Dashboard = (): ReactElement => {
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
        <Fragment>
            <div style={{ marginTop: '3rem' }}>
                <h1>Balances</h1>
                <StyledDashboard>{accounts}</StyledDashboard>
            </div>
            <div style={{ marginTop: '3rem' }}>
                <h1>Spending</h1>
                <BarChartContainer></BarChartContainer>
            </div>
        </Fragment>
    );
};
