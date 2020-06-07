import React, { Fragment, useState, useEffect } from 'react';
import useAuth from '../../context/auth';
import { StyledDashboard } from './Styles';
import { Balance } from './Balance/Balance';
import useItems from '../../shared/services/items';
import { BarChartContainer } from '../../shared/components/BarChart/BarChart';
export const Dashboard = () => {
    const { user } = useAuth();
    const { id: userId } = user;
    const { itemsByUser, getItemsByUser } = useItems();
    const [items, setItems] = useState([]);

    useEffect(() => {
        getItemsByUser(userId);
    }, [userId, getItemsByUser]);

    useEffect(() => {
        const newItems = itemsByUser[userId] || [];
        setItems(newItems);
    }, [userId, itemsByUser]);

    const accounts = items?.map(({ accounts }: { accounts: [] }) => {
        return accounts
            .filter((acc: any) => acc.type === 'depository')
            .map((account: any) => (
                <Balance>
                    <div style={{ fontWeight: 'bold' }}>{account.name}</div>
                    <h1 style={{ fontSize: '2.5rem' }}>
                        {new Intl.NumberFormat('en-us', {
                            style: 'currency',
                            currency: 'USD',
                        }).format(account.availableBalance)}
                    </h1>
                </Balance>
            ));
    });

    return (
        <Fragment>
            <div></div>
            <h1 className="title">Welcome {user?.displayName}</h1>
            <h2>Balances</h2>
            <StyledDashboard>{accounts}</StyledDashboard>
            <h2>Spending</h2>
            <BarChartContainer></BarChartContainer>
        </Fragment>
    );
};
