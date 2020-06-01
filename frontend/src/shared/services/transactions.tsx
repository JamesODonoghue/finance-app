import React, {
    createContext,
    useCallback,
    useContext,
    useReducer,
    useRef,
    useMemo,
} from 'react';
import { getTransactionsByUser as apiGetTransactionsByUser } from './api';
import { keyBy, omit, groupBy } from 'lodash';

interface IContextProps {
    allTransactions: any;
    transactionsByUser: any;
    transactionsById: any;
    getTransactionsByUser: any;
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
export const TransactionsContext = createContext<Partial<IContextProps>>({});

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
    const getTransactionsByUser = useCallback(async (userId, refresh) => {
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

/**
 * @desc Handles updates to the Items state as dictated by dispatched actions.
 */
function reducer(state: any, [type, payload]: any[]) {
    switch (type) {
        case TYPES.SUCCESSFUL_GET:
            if (!payload.length) {
                return state;
            }
            return { ...state, ...keyBy(payload, 'plaidTransactionId') };
        case TYPES.SUCCESSFUL_DELETE:
            return omit(state, [payload]);
        default:
            console.warn('unknown action: ', { type, payload });
            return state;
    }
}

export default function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}
