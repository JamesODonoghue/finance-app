import React, {
    createContext,
    useCallback,
    useContext,
    useReducer,
    useRef,
    useMemo,
} from 'react';
import { getTransactionsByUser as apiGetTransactionsByUser } from './api';
import { keyBy, groupBy, Dictionary } from 'lodash';
import { Transaction } from '../../types/transaction';

/** Transactions Provider*/
type State = Dictionary<Transaction>;

interface ContextProps {
    allTransactions: Transaction[];
    transactionsByUser: Dictionary<Transaction[]>;
    transactionsById: State;
    getTransactionsByUser: (userId: string) => Promise<void>;
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

const reducer = (
    state: State,
    [type, payload]: [TYPES, Transaction[]],
): State => {
    switch (type) {
        case TYPES.SUCCESSFUL_GET:
            if (!payload.length) {
                return state;
            }
            return { ...state, ...keyBy(payload, 'plaidTransactionId') };
        default:
            console.warn('unknown action: ', { type, payload });
            return state;
    }
};
export const TransactionsContext = createContext<Partial<ContextProps>>({});

export const TransactionsProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [transactionsById, dispatch] = useReducer(reducer, {});

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
        // if (!hasRequested.current.byUser[userId] || refresh) {
        hasRequested.current.byUser[userId] = true;
        const result = await apiGetTransactionsByUser(userId);
        const payload = await result.json();
        dispatch([TYPES.SUCCESSFUL_GET, payload]);
        // }
    }, []);

    const value = useMemo(() => {
        const allTransactions = Object.values(transactionsById);
        return {
            allTransactions,
            transactionsById,
            transactionsByUser: groupBy(allTransactions, 'userId'),
            getTransactionsByUser,
        };
    }, [transactionsById, getTransactionsByUser]);

    return (
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    );
};

export default function useTransactions() {
    const context = useContext(TransactionsContext);
    return context as ContextProps;
}
