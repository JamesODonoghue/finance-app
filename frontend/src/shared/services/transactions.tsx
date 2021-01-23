/* eslint-disable react/prop-types */
import React, { createContext, useCallback, useContext, useReducer, useRef, useMemo, useState, FC } from 'react';
import { getTransactionsByUser as apiGetTransactionsByUser } from './api';
import { keyBy, groupBy, Dictionary } from 'lodash';
import { Transaction } from '../../types/transaction';
import moment from 'moment';

/** Transactions Provider*/
type State = Dictionary<Transaction>;

interface CurrentDateRange {
    value: DATE_RANGES;
    text: string;
}
interface ContextProps {
    allTransactions: Transaction[];
    transactionsByUser: Dictionary<Transaction[]>;
    transactionsById: State;
    amountSpentMonthly: DateAmount[];
    currentDateRange: CurrentDateRange;
    getTransactionsByUser: (userId: string) => Promise<void>;
    summaryByMonth: any;
    setCurrentDateRange: any;
}

interface MonthlySummary {
    date: string;
    sumExpense: number;
    sumIncome: number;
}

/**
 * @desc Enumerated action types
 */
enum TYPES {
    SUCCESSFUL_GET,
    SUCCESSFUL_REQUEST,
    DELETE_BY_USER,
    SUCCESSFUL_DELETE,
}

export enum DATE_RANGES {
    THIS_MONTH = 'this_month',
    LAST_MONTH = 'last_month',
    THIS_YEAR = 'this_year',
}

interface DateAmount {
    date: string;
    value: number;
}

export const getSpentMonthly = (data: Transaction[]): DateAmount[] => {
    const OMIT_CATEGORIES = ['Transfer', 'Credit Card', 'Deposit', 'Payment'];

    const filteredTransactions = data.filter((trn) => {
        return OMIT_CATEGORIES.includes(trn.category);
    });
    const dataByMonth = groupBy(filteredTransactions, (item) =>
        moment(item.transactionDate, 'YYYY-M-DD').startOf('month'),
    );
    const totalSpentReducer = (acc: number, item: Transaction) => (item.amount > 0 ? acc + item.amount : acc);

    return Object.keys(dataByMonth)
        .map((key) => ({
            date: key,
            value: dataByMonth[key].reduce(totalSpentReducer, 0),
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getTransactionsByMonth = (data: Transaction[]): Dictionary<Transaction[]> =>
    groupBy(data, (item) => moment(item.transactionDate, 'YYYY-M-DD').startOf('month'));

export const getSumExpenseFromMonth = (data: Transaction[]): number => {
    const OMIT_CATEGORIES = ['Transfer', 'Credit Card', 'Deposit', 'Payment'];
    return data
        .filter((trn) => !OMIT_CATEGORIES.some((cat) => trn.category.split(',').includes(cat)))
        .reduce((acc, item) => (item.amount > 0 ? acc + item.amount : acc), 0);
};

export const getSumIncomeFromMonth = (data: Transaction[]): number => {
    const INCLUDE_CATEGORIES = ['Deposit'];

    return data
        .filter((trn) => INCLUDE_CATEGORIES.some((cat) => trn.category.split(',').includes(cat)))
        .reduce((acc, item) => (item.amount > 0 ? acc + item.amount : acc), 0);
};

export const getSummaryByMonth = (data: Transaction[]): MonthlySummary[] => {
    const transactionsByMonth = getTransactionsByMonth(data);

    return Object.keys(transactionsByMonth).map((key) => ({
        date: key,
        sumExpense: getSumExpenseFromMonth(transactionsByMonth[key]) * -1,
        sumIncome: getSumIncomeFromMonth(transactionsByMonth[key]),
    }));

    /**
     * return [{
     * date: ,
     * sumExpense,
     * sumIncome,
     * savings
     * }]
     */
};
const reducer = (state: State, [type, payload]: [TYPES, Transaction[]]): State => {
    switch (type) {
        case TYPES.SUCCESSFUL_GET:
            if (!payload.length) {
                return state;
            }
            return { ...state, ...keyBy(payload, 'id') };
        default:
            console.warn('unknown action: ', { type, payload });
            return state;
    }
};
export const TransactionsContext = createContext<Partial<ContextProps>>({});

export const TransactionsProvider: FC = ({ children }) => {
    const [transactionsById, dispatch] = useReducer(reducer, {});
    const [currentDateRange, setCurrentDateRange] = useState({ value: DATE_RANGES.THIS_MONTH, text: 'This Month' });

    const hasRequested = useRef<{
        byId: { [key: string]: boolean };
        byUser: { [key: string]: boolean };
    }>({
        byId: {},
        byUser: {},
    });

    /**
     * @desc Requests all Transactions that belong to an individual User.
     * The api request will be bypassed if the data has already been fetched.
     * A 'refresh' parameter can force a request for new data even if local state exists.
     */
    const getTransactionsByUser = useCallback(async (userId) => {
        hasRequested.current.byUser[userId] = true;
        const result = await apiGetTransactionsByUser(userId);
        const payload = await result.json();
        dispatch([TYPES.SUCCESSFUL_GET, payload]);
    }, []);

    const value = useMemo(() => {
        const allTransactions = Object.values(transactionsById);
        return {
            allTransactions,
            transactionsById,
            amountSpentMonthly: getSpentMonthly(allTransactions),
            summaryByMonth: getSummaryByMonth(allTransactions).slice(0, 11),
            currentDateRange,
            setCurrentDateRange,
            getTransactionsByUser,
        };
    }, [transactionsById, getTransactionsByUser, setCurrentDateRange, currentDateRange]);

    return <TransactionsContext.Provider value={value}>{children}</TransactionsContext.Provider>;
};

export default function useTransactions(): ContextProps {
    const context = useContext(TransactionsContext);
    return context as ContextProps;
}
