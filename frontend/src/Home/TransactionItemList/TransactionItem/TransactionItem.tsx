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

const iconMap: { [key: string]: [IconPrefix, IconName] } = {
    Travel: ['fas', 'plane'],
    'Food and Drink': ['fas', 'utensils'],
    Recreation: ['fas', 'biking'],
    Transfer: ['fas', 'exchange-alt'],
    Payment: ['fas', 'hand-holding-usd'],
};

export const TransactionItem = ({ transaction }: any) => {
    const parsedDate = moment(transaction.date).format('MMM DD');

    const icon = iconMap[transaction.category[0]] ? (
        <FontAwesomeIcon
            icon={iconMap[transaction.category[0]]}
        ></FontAwesomeIcon>
    ) : (
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
            {transaction.name.charAt(0)}
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
                        {transaction.category[0]}
                    </TransactionCategory>
                    <TransactionName>{transaction.name}</TransactionName>
                </div>
                <div>
                    <TransactionAmount>
                        {transaction.amount.toFixed(2)}
                    </TransactionAmount>
                    <TransactionDate>{parsedDate}</TransactionDate>
                </div>
            </div>
        </StyledTransactionItem>
    );
};
