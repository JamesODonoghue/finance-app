import React from 'react';
import { useEffect, Fragment } from 'react';
import { StyledTransactionList } from './Styles';
import { TransactionItem } from './TransactionItem/TransactionItem';
import useTransactions from '../../shared/services/transactions';
import useAuth from '../../context/auth';
export const TransactionItemList = () => {
    const { allTransactions, getTransactionsByUser } = useTransactions();
    const { user } = useAuth();

    useEffect(() => {
        getTransactionsByUser(user.id);
    }, [user, getTransactionsByUser]);
    return (
        <Fragment>
            <h2>Recent Transactions</h2>
            <StyledTransactionList>
                {allTransactions?.map((item: any) => (
                    <TransactionItem transaction={item}></TransactionItem>
                ))}
            </StyledTransactionList>
        </Fragment>
    );
};
