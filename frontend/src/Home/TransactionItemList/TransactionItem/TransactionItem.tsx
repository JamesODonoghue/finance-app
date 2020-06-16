import React from 'react';
import {
    StyledTransactionItem,
    TransactionAmount,
    TransactionName,
    TransactionDate,
    TransactionCategory,
} from './Styles';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { Transaction } from '../../../types/transaction';

const iconMap: { [key: string]: [IconPrefix, IconName] } = {
    Travel: ['fas', 'plane'],
    'Food and Drink': ['fas', 'utensils'],
    Recreation: ['fas', 'biking'],
    Transfer: ['fas', 'exchange-alt'],
    Payment: ['fas', 'hand-holding-usd'],
};

export const TransactionItem = ({
    transaction,
}: {
    transaction: Transaction;
}) => {
    const parsedDate = moment(transaction.transactionDate).format('MMM DD');

    const icon = iconMap[transaction.category] ? (
        <FontAwesomeIcon icon={iconMap[transaction.category]}></FontAwesomeIcon>
    ) : (
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
            {transaction.transactionName.charAt(0)}
        </div>
    );
    return (
        <StyledTransactionItem>
            <div
                style={{
                    minWidth: '50px',
                    alignSelf: 'center',
                    backgroundColor: '#f5f6fa',
                    lineHeight: '50px',
                    textAlign: 'center',
                    borderRadius: '.5rem',
                    marginRight: '1rem',
                }}
            >
                {icon}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <div>
                    <TransactionCategory>
                        {transaction.category}
                    </TransactionCategory>
                    <TransactionName>
                        {transaction.transactionName}
                    </TransactionName>
                </div>
                <div>
                    <TransactionAmount amount={transaction.amount}>
                        {transaction.amount.toFixed(2)}
                    </TransactionAmount>
                    <TransactionDate>{parsedDate}</TransactionDate>
                </div>
            </div>
        </StyledTransactionItem>
    );
};
